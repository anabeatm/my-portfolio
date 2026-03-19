import { pageData } from "./data.js";

let zIndexGlobal = 1;
let getWindows = 1;

export function openPage(key) {
  const data = pageData[key];

  if (!data) return; // caso a chave não exista

  const page = document.createElement("div"); // janela principal
  page.classList.add("os-pages");

  page.style.top = 50 + getWindows * 20 + "px"; // posição inicial
  page.style.left = 50 + getWindows * 20 + "px";

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

  if (key == "projects" && data.reposToDisplay) {
    fetchGithubProjects(data.reposToDisplay, body);
  }

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

async function fetchGithubProjects(reposToDisplay, containerNode) {
  try {
    const response = await fetch("https://api.github.com/users/anabeatm/repos");
    const allRepos = await response.json();

    const filteredRepos = allRepos.filter((repo) =>
      reposToDisplay.includes(repo.name),
    );

    let html = '<ul class="github-projects-list">';
    filteredRepos.forEach((repo) => {
      html += `
        <li class="github-repo-item">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">
            <div class="repo-info">
              <h3 class="repo-name">📁 ${repo.name}</h3>
              <p class="repo-desc">${repo.description || "No description or website provided"}</p>
              <div class="repo-stats">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>${repo.language ? `💻 ${repo.language}` : ""}</span>
              </div>
            </div>
          </a>
        </li>
      `;
    });
    html += "</ul>";

    containerNode.innerHTML = html;
  } catch {
    console.error("Error: ", error);
    containerNode.innerHTML =
      "<p>An error occurred while loading the projects..</p>";
  }
}
