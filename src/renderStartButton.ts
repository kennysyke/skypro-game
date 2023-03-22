import { renderGameScreen } from '/src/renderGameScreen';

export function renderStartButton(container: HTMLElement): void {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('startScreen__button');

    startButton.addEventListener('click', () => {
        window.application.level = document.querySelector<HTMLInputElement>(
            'input[name="difficulty"]:checked'
        )?.id as Level;

        renderGameScreen();
    });

    container.appendChild(startButton);
}
