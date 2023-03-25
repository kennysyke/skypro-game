export function timerCreation() {
    let time = 0;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        const timerCount = document.querySelector(
            '.gameScreen__timer'
        ) as HTMLElement;
        timerCount.textContent = `${minutes}:${seconds}`;
        time++;
    }, 1000);
    window.application.timers.push(timerInterval);
}

// clearInterval(window.application.timers.timerInterval);
// delete window.application.timers.myTimer;
