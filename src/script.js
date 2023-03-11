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
    renderScreen: function (screenName) {
        this.screens[screenName]();
    },
    renderBlock: function (blockName, container) {
        this.blocks[blockName](container);
    },
    level: [],
};

function renderStartButton(container) {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');

    startButton.addEventListener('click', () => {
        window.application.level = document.querySelector(
            'input[name="difficulty"]:checked'
        ).id;

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
const numCardsDifficult = 18;

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
}

function renderRestartButton(container) {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('gameScreen__button');

    restartButton.addEventListener('click', () => {
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

    container.appendChild(restartButton);
}

function renderGameScreen(cards) {
    const app = document.querySelector('.app');
    app.textContent = '';

    const topboard = document.createElement('div');
    topboard.classList.add('gameScreen__topboard');
    topboard.classList.add('center');

    const board = document.createElement('div');
    board.classList.add('gameScreen__board');
    board.classList.add('center');

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('gameScreen__card');
        card.dataset.index = i;
        card.dataset.suit = cards[i].suit;
        card.dataset.rank = cards[i].rank;

        const front = document.createElement('div');
        front.classList.add('gameScreen__front');
        front.classList.add(cards[i].suit + cards[i].rank);

        const back = document.createElement('div');
        back.classList.add('gameScreen__back');

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

    // let modalWin = $modal({
    //     title: 'You have won, congratulations',
    //     content: '<img class="modal_image" scr="/img/Image.png">',
    // });

    // let modalLost = $modal({
    //     title: 'You have lost',
    //     content: '<img class="modal_image" scr="/img/Image-2.png">',
    //     footerButtons: [{ class: 'modal_button', text: 'play again' }],
    // });

    function showModal(won, timeTaken) {
        const overlay = document.querySelector('.overlay');
        const modalHeader = document.querySelector('.modal-header-text');
        const modalImage = document.querySelector('.modal-image');
        const modalTimeTaken = document.querySelector('.modal-time-taken');
        const modalTime = document.querySelector('.modal-time');

        // Set modal header text and image based on whether the player won or lost
        if (won) {
            modalHeader.textContent = 'Congratulations!';
            modalImage.src = 'img/Image.png';
        } else {
            modalHeader.textContent = 'Sorry, you lost.';
            modalImage.src = 'img/Image-2.png';
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
        const restartButton = document.querySelector('.modal-restart-button');
        restartButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            window.application.renderScreen('start');
        });

        // Set up event listener for close button
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    let flippedCard = null;
    let matchedCards = 0;

    function flipCard(card) {
        console.log(card);
        console.log(flippedCard);
        console.log(this);
        if (flippedCard === null) {
            this.classList.remove('flipped');
            flippedCard = this;
            console.log(flippedCard);
        } else if (this === flippedCard) {
            return;
        } else {
            this.classList.remove('flipped');
            if (
                flippedCard.dataset.rank === this.dataset.rank &&
                flippedCard.dataset.suit === this.dataset.suit
            ) {
                matchedCards++;
                flippedCard = null;
                if (matchedCards === cards.length / 2) {
                    endTimer();
                    showModal(true, time);
                    console.log(`you have won`);
                }
            } else {
                endTimer();
                showModal(false, time);
                console.log(`game over`);
            }
        }
    }

    const createdCards = document.querySelectorAll('.gameScreen__card');

    console.log(createdCards);

    for (let i = 0; i < createdCards.length; i++) {
        createdCards[i].addEventListener(
            'click',
            flipCard.bind(createdCards[i])
        );
    }
}
