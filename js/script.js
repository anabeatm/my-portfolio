const pageData = {
  about: {
    title: "About Me",
    content: "<h2>Olá!</h2><p>placeholder</p>",
  },
  projects: {
    title: "My Projects",
    content: "<ul><li>Projeto 1</li><li>Projeto 2</li></ul>",
  },
  contact: {
    title: "Contact",
    content: "<p>Email: contato@email.com</p><p>LinkedIn: /in/usuario</p>",
  },
  path: {
    title: "Career Path",
    content: "<p>Minha jornada começou em 202X...</p>",
  },
};

let zIndexGlobal = 1;
let getWindows = 1;

function openPage(key) {
  const data = pageData[key];
  const page = document.createElement("div"); // janela principal
  page.classList.add("os-pages");

  page.style.top = 50 + (getWindows % 10) * 20 + "px";
  page.style.left = 50 + (getWindows % 10) * 20 + "px";
  getWindows++;

  page.style.zIndex = zIndexGlobal++; // nasce na frente de todos

  const header = document.createElement("div"); // criação da header
  header.classList.add("os-pages-header");
  header.innerHTML = `<span>${data.title}</span>`;

  const closeBtn = document.createElement("button"); // criação do btn de fechar
  closeBtn.classList.add("btn-close-os");
  closeBtn.innerText = "X";

  closeBtn.onclick = () => page.remove(); // ao clicar, fecha a janela

  header.appendChild(closeBtn);

  // criação do corpo
  const body = document.createElement("div");
  body.classList.add("os-pages-body");
  body.innerHTML = data.content;

  page.appendChild(header);
  page.appendChild(body);
  document.body.appendChild(page); // junta tudo

  page.addEventListener("mousedown", () => {
    page.style.zIndex = zIndexGlobal++; // traz a janela para frente smp q clicar nela
  });

  let posMouseX = 0;
  let posMouseY = 0;
  let posStartX = 0;
  let posStartY = 0; //x horizontal e y vertical

  header.onmousedown = function (e) {
    // quando agarra o header da janela
    e.preventDefault(); // cancela um evento se for possível ser cancelado
    // por exemplo: cancela um link de seguir a URL - W3 School
    // salva a posição onde o mouse clicou primeiro
    posStartX = e.clientX;
    posStartY = e.clientY;

    document.onmouseup = dropPage;
    document.onmousemove = dragPage;
  };

  function dragPage(e) {
    e.preventDefault();

    posMouseX = posStartX - e.clientX; // a distancia entre a posicao antiga e a nova
    posMouseY = posStartY - e.clientY;

    posStartX = e.clientX;
    posStartY = e.clientY; // atualiza a posicao atual para o proximo frame

    page.style.top = page.offsetTop - posMouseY + "px"; // a distancia movida de top e left atuais da page
    page.style.left = page.offsetLeft - posMouseX + "px";
  }

  function dropPage() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
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
