import { describe, expect, test } from '@jest/globals';
import { generateCards } from './src/generateCards';


describe('generateCards', () => {
    test('returns an array of cards equal to requred number of cards', () => {
        const numCards = 16;
        const cards = generateCards(numCards);

        expect(cards.length).toBe(numCards);
    });

    test('returns an array of cards with matching pairs', () => {
        const numCards = 8;
        const cards = generateCards(numCards);

        const matchedCards = [];
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < i; j++) {
                if (
                    cards[i].rank === cards[j].rank &&
                    cards[i].suit === cards[j].suit
                ) {
                    matchedCards.push(cards[i], cards[j]);
                    break;
                }
            }
        }

        expect(matchedCards.length).toBe(numCards);
    });
});
