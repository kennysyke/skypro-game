import { showModal } from './modal';
import { stopTimer } from './timerCreation';

let flippedCard: HTMLElement | null = null;
let matchedCards: number = 0;

export function flipCard(this: HTMLElement) {
    const cards: NodeListOf<HTMLElement> =
        document.querySelectorAll('.gameScreen__card');

    console.log(cards);

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
                matchedCards = 0;
                showModal(true);
            }
        } else {
            matchedCards = 0;
            flippedCard = null;
            showModal(false);
        }
    }
}
