function attClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formatedTime = `${hours}:${minutes}`;

  const clockElement = document.querySelector(".time");

  if (clockElement) {
    clockElement.textContent = formatedTime;
  }
}

function attDate() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());

  const formatedDate = `${day}/${month}/${year}`;

  const dateElement = document.querySelector(".date");

  if (dateElement) {
    dateElement.textContent = formatedDate;
  }
}

function openWindow(windowID) {
  const windowElement = document.getElementById(windowID);
  if (windowElement) {
    windowElement.style.display = "flex";
    bringToFront(windowElement);
  }
}

function closeWindow(windowID) {
  const windowElement = document.getElementById(windowID);
  if (windowElement) {
    windowElement.style.display = "none";
  }
}

let zIndexCounter = 100;

function bringToFront(element) {
  zIndexCounter++;
  element.style.zIndex = zIndexCounter;
}

document.getElementById("btn-projects").addEventListener("click", (e) => {
  e.preventDefault();
  openWindow("window-projects");
});

document.getElementById("btn-contact").addEventListener("click", (e) => {
  e.preventDefault();
  openWindow("window-contact");
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetID = btn.getAttribute("data-target");
    closeWindow(targetID);
  });
});

document.querySelectorAll(".window").forEach((win) => {
  win.addEventListener("mousedown", () => {
    bringToFront(win);
  });
});

function makeDraggable(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const header = element.querySelector(".title-bar");

  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.Event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.Event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.transform = "none";
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.querySelectorAll(".window").forEach((win) => {
  makeDraggable(win);
});

setInterval(attClock, 1000);

attClock();

attDate();
