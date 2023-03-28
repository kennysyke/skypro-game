import '/static/style.css';
import '/static/cards.css';
import { renderStartScreen } from './renderStartScreen';
import { renderStartButton } from './renderStartButton';
import { renderRestartButton } from './renderRestartButton';
import { renderGameScreen } from './renderGameScreen';

type Level = '1' | '2' | '3';

declare global {
    interface Window {
        application: {
            blocks: {
                [key: string]: (container: HTMLElement) => void;
            };
            screens: {
                [key: string]: () => void;
            };
            renderScreen: (screenName: string) => void;
            renderBlock: (blockName: string, container: HTMLElement) => void;
            level: Level | null;
            timers: NodeJS.Timer[];
        };
    }
}

window.application = {
    blocks: {
        'start-button': renderStartButton,
        'restart-button': renderRestartButton,
    },
    screens: {
        start: renderStartScreen,
        game: renderGameScreen,
    },
    renderScreen: function (screenName: string) {
        this.screens[screenName]();
    },
    renderBlock: function (blockName: string, container: HTMLElement) {
        this.blocks[blockName](container);
    },
    level: null,
    timers: [],
};

renderStartScreen();
