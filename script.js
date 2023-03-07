window.application = {
    blocks: {
        'start-button': renderStartButton
    },
    token: {},
    id: {},
    screens: {
        start: renderStartScreen,
        game: renderGameScreen
    },
    renderScreen: function (screenName) {
        this.screens[screenName]();
    },
    renderBlock: function (blockName, container) {
        this.blocks[blockName](container);
    },
    level: []
}

function renderStartButton(container) {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');

    startButton.addEventListener('click', () => {
        window.application.level = document.querySelector('input[name="difficulty"]:checked').id;

        let numCards;
        if (window.application.level === '1') {
            numCards = numCardsEasy;
        } else if (window.application.level === '2') {
            numCards = numCardsMedium;
        } else if (window.application.level === '3') {
            numCards = numCardsDifficult;
        }

        const cards = generateCards(numCards);

        renderGameScreen(cards);
    });

    container.appendChild(startButton);
}


function renderStartScreen() {
    const app = document.querySelector('.app');
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
        label.htmlFor = i;
        label.textContent = i;
        const input = document.createElement('input');
        input.classList.add('startScreen__input');
        input.id = i;
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'difficulty');

        background.appendChild(content);
        content.appendChild(input);
        content.appendChild(label);

    }


    window.application.renderBlock('start-button', background);
}

window.application.renderScreen('start');

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const numCardsEasy = 6;
const numCardsMedium = 12;
const numCardsDifficult = 20;


function generateCards(numCards) {
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
};

function renderGameScreen(cards) {
    const app = document.querySelector('.app');
    app.textContent = '';

    const board = document.createElement('div');
    board.classList.add('gameScreen__board');

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('gameScreen__card');
        card.dataset.index = i;

        const front = document.createElement('div');
        front.classList.add('gameScreen__front');
        front.classList.add(cards[i].suit + cards[i].rank);

        const back = document.createElement('div');
        back.classList.add('gameScreen__back');

        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(card);
    }
    app.appendChild(board);
}

let choosenCard = null;
let numMatchedCards = 0;

const createdCards = document.querySelectorAll('.card');

createdCards.forEach((card) => {

    card.addEventListener('click', () => {

        console.log(`you clicked on a card`);

    })

});


