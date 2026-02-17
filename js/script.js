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

function attDate() { 
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());

    const formatedDate = `${day}/${month}/${year}`;

    const dateElement = document.querySelector('.date');

    if (dateElement) { 
        dateElement.textContent = formatedDate;
    }

}

setInterval(attClock, 1000);

attClock();

attDate();