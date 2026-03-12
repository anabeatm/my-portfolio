let zIndexGlobal = 1;
let getWindows = 1;

function openPage() {
  const page = document.createElement("div");
  page.classList.add("os-pages");

  page.style.top = 50 + getWindows * 20 + "px";
  page.style.left = 50 + getWindows * 20 + "px";

  page.style.zIndex = zIndexGlobal++;

  const header = document.createElement("div");
  header.classList.add("os-pages-header");
  header.innerHTML = `<span>name<span>`;

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('btn-close-os');
  closeBtn.innerText = 'X';

  closeBtn.onclick = () => page.remove();

  header.appendChild(closeBtn);
}

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

setInterval(attClock, 1000);

attClock();

attDate();
