<h1> Memory Card Game </h1>

This is a simple memory card game implemented in HTML, CSS, and JavaScript.

<h2> Getting started </h2>

To play the game, simply open the **index.html** file in your browser. You should see a start screen with a "Start" button and three difficulty levels. Choose the disured level and click the button to start the game.

The game has three levels of difficulty:

Easy: 3 pairs of cards (6 cards total).
Medium: 6 pairs of cards (12 cards total).
Difficult: 9 pairs of cards (18 cards total).

On each level, you need to match all pairs of cards to win with the first try. You can flip two cards at a time. If the cards match, they will stay face up. If the cards don't match, you will see a losing screen.

Once you match all pairs of cards, you win the game and see a "Congratulations" message.

<h2> Implementation details </h2>

The game is implemented in JavaScript using the following concepts:

HTML DOM manipulation with querySelector, createElement, appendChild, etc.
Event handling with addEventListener.
Arrays and array manipulations
Object-oriented programming with classes and inheritance.
Asynchronous programming with setTimeout.
CSS styling with classes and classList.

The code is organized into several functions and objects:

generateCards(numCards) generates an array of Card objects with random ranks and suits.
renderStartButton(container) renders the start button on the start screen.
renderRestartButton(container) renders the restart button on the game screen.
renderGameScreen(cards) renders the game screen with the given cards.
Card is a class representing a card with a rank and a suit.
Level is a union type representing the three levels of difficulty.
Application is an object containing the application state and methods.
The code also includes TypeScript type annotations for better type checking and IntelliSense in modern code editors.