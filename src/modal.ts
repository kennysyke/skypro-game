import { renderStartScreen } from './renderStartScreen';

export function showModal(won: boolean, timeTaken: number): void {
    const overlay = document.querySelector('.overlay') as HTMLElement;
    const modalHeader = document.querySelector(
        '.modal-header-text'
    ) as HTMLElement;
    const modalImage = document.querySelector(
        '.modal-image'
    ) as HTMLImageElement;
    const modalTimeTaken = document.querySelector(
        '.modal-time-taken'
    ) as HTMLElement;
    const modalTime = document.querySelector('.modal-time') as HTMLElement;

    // Set modal header text and image based on whether the player won or lost
    if (won) {
        modalHeader.textContent = 'Congratulations!';
        modalImage.src = 'static/img/Image.png';
    } else {
        modalHeader.textContent = 'Sorry, you lost.';
        modalImage.src = 'static/img/Image-2.png';
    }

    // Set modal time taken text
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    modalTimeTaken.textContent = `Time taken:`;
    modalTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

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
