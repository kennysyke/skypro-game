import { renderStartScreen } from './renderStartScreen';
import { stopTimer } from './timerCreation';

export function showModal(won: boolean) {
    const overlay = document.querySelector('.overlay') as HTMLElement;
    const modalHeader = document.querySelector(
        '.modal-header-text'
    ) as HTMLElement;
    const modalImage = document.querySelector(
        '.modal-image'
    ) as HTMLImageElement;

    const modalTime = document.querySelector('.modal-time') as HTMLElement;

    const finalTime = stopTimer();

    // Set modal header text and image based on whether the player won or lost
    if (won) {
        modalHeader.textContent = 'Congratulations!';
        modalImage.src = 'static/img/Image.png';
    } else {
        modalHeader.textContent = 'Sorry, you lost.';
        modalImage.src = 'static/img/Image-2.png';
    }

    modalTime.textContent = finalTime;

    // Show the modal
    overlay.style.display = 'block';

    // Set up event listener for restart button
    const restartButton = document.querySelector(
        '.modal-restart-button'
    ) as HTMLElement;
    restartButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        renderStartScreen();
    });

    // Set up event listener for close button
    const closeButton = document.querySelector('.close') as HTMLElement;
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}
