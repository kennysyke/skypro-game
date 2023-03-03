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
        if (document.getElementById('1').checked) {
            console.log(`easy one`);
        } else if (document.getElementById('2').checked) {
            console.log(`medium one`);
        } else {
            console.log(`hard one`);
        }
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

    app.appendChild(title);

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

        app.appendChild(content);
        content.appendChild(label);
        content.appendChild(input);
    }


    window.application.renderBlock('start-button', app);
}

window.application.renderScreen('start');