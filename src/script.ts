import '/static/style.css';
import '/static/cards.css';
// import { renderStartScreen } from './renderStartScreen';
// import { renderStartButton } from './renderStartButton';
// import { renderRestartButton } from './renderRestartButton';
// import { renderGameScreen } from './renderGameScreen';
// import { showModal } from './modal';

type Level = '1' | '2' | '3';

declare global {
    interface Window {
        application: {
            blocks: {
                [key: string]: (container: HTMLElement) => void;
            };
            token: any;
            id: any;
            screens: {
                [key: string]: () => void;
            };
            renderScreen: (screenName: string) => void;
            renderBlock: (blockName: string, container: HTMLElement) => void;
            level: Level | null;
        };
    }
}


window.application = {
    blocks: {
        'start-button': renderStartButton,
        'restart-button': renderRestartButton,
    },
    token: {},
    id: {},
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
};

function renderStartButton(container: HTMLElement): void {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');

    startButton.addEventListener('click', () => {
        window.application.level = document.querySelector<HTMLInputElement>(
            'input[name="difficulty"]:checked'
        )?.id as Level;

        renderGameScreen();
    });

    container.appendChild(startButton);
}

function renderStartScreen() {
    const app = document.querySelector('.app') as Element;
    app.textContent = '';

    const background = document.createElement('div');
    background.classList.add('startScreen__background');

    const title = document.createElement('h1');
    title.textContent = 'Choose difficulty';
    title.classList.add('startScreen__title');

    const content = document.createElement('div');
    content.classList.add('startScreen__content');

    app.appendChild(background);
    background.appendChild(title);

    for (let i = 1; i <= 3; i++) {
        const label = document.createElement('label');
        label.classList.add('startScreen__label');
        label.htmlFor = i.toString();
        label.textContent = i.toString();
        const input = document.createElement('input');
        input.classList.add('startScreen__input');
        input.id = i.toString();
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'difficulty');

        background.appendChild(content);
        content.appendChild(input);
        content.appendChild(label);
    }

    window.application.renderBlock('start-button', background);
}

renderStartScreen();

const numCardsEasy = 6;
const numCardsMedium = 12;
const numCardsDifficult = 18;

function generateCards(numCards: number) {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const cards = [];

    for (let i = 0; i < numCards / 2; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        cards.push({ suit, rank });
        cards.push({ suit, rank });
    }

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
}

function renderRestartButton(container: HTMLElement): void {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('gameScreen__button');

    restartButton.addEventListener('click', () => {
        renderGameScreen();
    });

    container.appendChild(restartButton);
}

function renderGameScreen() {
    const app = document.querySelector('.app') as Element;
    app.textContent = '';

    const topboard = document.createElement('div');
    topboard.classList.add('gameScreen__topboard');
    topboard.classList.add('center');

    const board = document.createElement('div');
    board.classList.add('gameScreen__board');
    board.classList.add('center');

    let numCards: number = 0;
    if (window.application.level === '1') {
        numCards = numCardsEasy;
    } else if (window.application.level === '2') {
        numCards = numCardsMedium;
    } else if (window.application.level === '3') {
        numCards = numCardsDifficult;
    }

    const cards = generateCards(numCards);

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('gameScreen__card');
        card.dataset.index = i.toString();
        card.dataset.suit = cards[i].suit;
        card.dataset.rank = cards[i].rank;

        const front = document.createElement('div');
        front.classList.add('gameScreen__front');
        front.classList.add(cards[i].suit + cards[i].rank);
        front.style.backgroundImage = `url(./static/img/cards/${cards[i].suit}/${cards[i].rank}.svg`;

        const back = document.createElement('div');
        back.classList.add('gameScreen__back');
        back.style.backgroundImage = `url(./static/img/рубашка.svg)`;

        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(card);

        setTimeout(() => {
            card.classList.add('flipped');
        }, 5000);
    }

    app.appendChild(topboard);
    app.appendChild(board);

    const timerCount = document.createElement('div');
    timerCount.classList.add('gameScreen__timer');
    let time = 0;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        timerCount.textContent = `${minutes}:${seconds}`;
        time++;
    }, 1000);
    topboard.appendChild(timerCount);
    window.application.renderBlock('restart-button', topboard);

    const endTimer = () => {
        clearInterval(timerInterval);
    };

    function showModal(won: boolean, timeTaken: number): void {
        const overlay = document.querySelector('.overlay') as HTMLElement;
        const modalHeader = document.querySelector(
            '.modal-header-text'
        ) as HTMLElement;
        const modalImage = document.querySelector(
            '.modal-image'
        ) as HTMLImageElement;
        const modalTimeTaken = document.querySelector(
            '.modal-time-taken'
        ) as HTMLElement;
        const modalTime = document.querySelector('.modal-time') as HTMLElement;

        // Set modal header text and image based on whether the player won or lost
        if (won) {
            modalHeader.textContent = 'Congratulations!';
            modalImage.src = 'static/img/Image.png';
        } else {
            modalHeader.textContent = 'Sorry, you lost.';
            modalImage.src = 'static/img/Image-2.png';
        }

        // Set modal time taken text
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        modalTimeTaken.textContent = `Time taken:`;
        modalTime.textContent = `${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Show the modal
        overlay.style.display = 'block';

        // Set up event listener for restart button
        const restartButton = document.querySelector(
            '.modal-restart-button'
        ) as HTMLElement;
        restartButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            renderStartScreen();
        });

        // Set up event listener for close button
        const closeButton = document.querySelector('.close') as HTMLElement;
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    let flippedCard: HTMLElement | null = null;
    let matchedCards: number = 0;

    function flipCard(this: HTMLElement) {
        if (flippedCard === null) {
            this.classList.remove('flipped');
            flippedCard = this;
            console.log(flippedCard);
        } else if (this === flippedCard) {
            return;
        } else {
            this.classList.remove('flipped');
            const flippedCardRank = flippedCard.dataset.rank;
            const flippedCardSuit = flippedCard.dataset.suit;
            const thisCardRank = this.dataset.rank;
            const thisCardSuit = this.dataset.suit;

            if (
                flippedCardRank === thisCardRank &&
                flippedCardSuit === thisCardSuit
            ) {
                matchedCards++;
                flippedCard = null;
                if (matchedCards === cards.length / 2) {
                    endTimer();
                    showModal(true, time);
                }
            } else {
                endTimer();
                showModal(false, time);
            }
        }
    }

    const createdCards: NodeListOf<HTMLElement> =
        document.querySelectorAll('.gameScreen__card');

    console.log(createdCards);

    for (let i = 0; i < createdCards.length; i++) {
        createdCards[i].addEventListener(
            'click',
            flipCard.bind(createdCards[i])
        );
    }
}
