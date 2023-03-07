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
    level: []
}

function renderStartButton(container) {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');


    startButton.addEventListener('click', () => {
        window.application.level = document.querySelector('input[name="difficulty"]:checked').id;
        if (window.application.level === 1) {
            console.log(`easy one`);
        } else if (window.application.level === 2) {
            console.log(`medium one`);
        } else if (window.application.level === 3) {
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