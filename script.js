window.application = {
    blocks: {
        'start-button': renderStartButton
    },
    token: {},
    id: {},
    screens: {
        start: renderStartScreen
    },
    renderScreen: function (screenName) {
        this.screens[screenName]();
    },
    renderBlock: function (blockName, container) {
        this.blocks[blockName](container);
    },
    timers: []
}


function renderStartButton(container) {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');

    startButton.addEventListener('click', () => {

    });

    container.appendChild(startButton);
}


function renderStartScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Choose difficulty';
    title.classList.add('startScreen__title');

    const content = document.createElement('div');
    content.classList.add('startScreen__content');
    const labelOne = document.createElement('label');
    labelOne.classList.add('startScreen__label');
    labelOne.htmlFor = '1';
    labelOne.textContent = '1';
    const inputOne = document.createElement('input');
    inputOne.classList.add('startScreen__input');
    inputOne.id = '1';
    inputOne.setAttribute('type', 'radio');
    inputOne.setAttribute('name', 'difficulty');

    const labelTwo = document.createElement('label');
    labelTwo.classList.add('startScreen__label');
    labelTwo.htmlFor = '2';
    labelTwo.textContent = '2';
    const inputTwo = document.createElement('input');
    inputTwo.classList.add('startScreen__input');
    inputTwo.id = '2';
    inputTwo.setAttribute('type', 'radio');
    inputTwo.setAttribute('name', 'difficulty');

    const labelThree = document.createElement('label');
    labelThree.classList.add('startScreen__label');
    labelThree.htmlFor = '3';
    labelThree.textContent = '3';
    const inputThree = document.createElement('input');
    inputThree.classList.add('startScreen__input');
    inputThree.id = '3';
    inputThree.setAttribute('type', 'radio');
    inputThree.setAttribute('name', 'difficulty');


    app.appendChild(title);
    app.appendChild(content);
    content.appendChild(labelOne);
    content.appendChild(inputOne);
    content.appendChild(labelTwo);
    content.appendChild(inputTwo);
    content.appendChild(labelThree);
    content.appendChild(inputThree);
    window.application.renderBlock('start-button', app);
}

window.application.renderScreen('start');