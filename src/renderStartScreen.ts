export function renderStartScreen() {
    const app = document.querySelector('.app') as Element;
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
        label.htmlFor = i.toString();
        label.textContent = i.toString();
        const input = document.createElement('input');
        input.classList.add('startScreen__input');
        input.id = i.toString();
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'difficulty');

        background.appendChild(content);
        content.appendChild(input);
        content.appendChild(label);
    }

    window.application.renderBlock('start-button', background);
}
