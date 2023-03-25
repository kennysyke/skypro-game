import { renderGameScreen } from './renderGameScreen';

export function renderRestartButton(container: HTMLElement): void {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('gameScreen__button');

    restartButton.addEventListener('click', () => {
        renderGameScreen();
    });

    container.appendChild(restartButton);
}
