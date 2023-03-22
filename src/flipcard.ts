import { showModal } from './modal';
// import { renderGameScreen } from './renderGameScreen';

let flippedCard: HTMLElement | null = null;
let matchedCards: number = 0;

export function flipCard(this: HTMLElement) {
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
