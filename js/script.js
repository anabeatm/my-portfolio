function attClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formatedTime = `${hours}:${minutes}`;

    const clockElement = document.querySelector('.time');

    if (clockElement) { 
        clockElement.textContent = formatedTime;
    }
}

setInterval(attClock, 1000);

attClock();