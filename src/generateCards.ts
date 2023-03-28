// interface Card {
//     rank: string;
//     suit: string;
// }

// export function generateCards(numCards: number): Card[] {
//     const ranks = ['A', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//     const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
//     const cards: Card[] = [];

//     for (let i = 0; i < numCards / 2; i++) {
//         const rankIndex = Math.floor(Math.random() * ranks.length);
//         const suitIndex = Math.floor(Math.random() * suits.length);

//         const card: Card = {
//             suit: suits[suitIndex],
//             rank: ranks[rankIndex],
//         };

//         const matchingCard: Card = {
//             suit: suits[suitIndex],
//             rank: ranks[rankIndex],
//         };

//         // if (!cards.some((c) => c.rank === card.rank && c.suit === card.suit)) {
//             cards.push(card);
//             cards.push(matchingCard);
//         // }
//     }

//     return cards.sort(() => Math.random() - 0.5);
// }

export function generateCards(numCards: number) {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const cards = [];

    for (let i = 0; i < numCards / 2; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        cards.push({ suit, rank });
        cards.push({ suit, rank });
    }

    // for (let i = cards.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [cards[i], cards[j]] = [cards[j], cards[i]];
    // }

    return cards.sort(() => Math.random() - 0.5);
}
