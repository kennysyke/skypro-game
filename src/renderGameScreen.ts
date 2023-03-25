import { showModal } from './modal';
import { flipCard } from './flipcard';
import { generateCards } from './generateCards';
import { timerCreation } from './timerCreation';

const numCardsEasy = 6;
const numCardsMedium = 12;
const numCardsDifficult = 18;

export function renderGameScreen() {
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

    topboard.appendChild(timerCreation());
    window.application.renderBlock('restart-button', topboard);

    const endTimer = () => {
        clearInterval(timerInterval);
    };

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
