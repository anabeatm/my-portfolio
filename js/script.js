async function apiGithub() {
  try {
    const response = await fetch("https://api.github.com/users/anabeatm/repos");
    if (!response.ok) {
      console.log("Error: Not found!");
      return;
    }

    let repos = await response.json();

    const inHighlights = {
      "cute-electron-calendar-widget": {
        icon: "ph-calendar",
        bgColor: "#f8a5c2",
        status: "In Progress",
      },
      "music-player": {
        icon: "ph-music-notes",
        bgColor: "#d8bfd8",
        status: "In Progress",
      },
      "bee-discord-bot": {
        icon: "ph-robot",
        bgColor: "#a5d6a7",
        status: "In Progress",
      },
      "sistema-de-gestao-para-cafeteria": {
        icon: "ph-coffee",
        bgColor: "#d6c1a5",
        status: "In Progress",
      }
    };

    repos = repos.filter((repo) => inHighlights[repo.name]);

    const container = document.getElementById("project-list");
    container.innerHTML = "";
    const cardRepos = repos.map((repo) => {
      const config = inHighlights[repo.name];

      const topics = repo.topics || [];
      const tagsHTML = topics
        .map((topic) => `<span class="tag">${topic}</span>`)
        .join("");
      const statusClass =
        config.status === "Live" ? "status-live" : "status-progress";

      return `
      <div class="project-card" onclick="window.open('${repo.html_url}', _blank">
        <div class="project-icon" style="background-color: ${config.bgColor};">
          <i class="ph ${config.icon}"></i>
        </div>
        
        <div class="project-info">
          <div class="project-header">
            <h3><a href="${repo.html_url}" target="_blank">${repo.name.replace(/-/g, " ")}</a></h3>
            <span class="status-badge ${statusClass}">${config.status}</span>
          </div>
          
          <p class="project-desc">${repo.description || "No description avaible."}</p>
          
          <div class="project-tags">
            ${tagsHTML}
          </div>
        </div>
      </div>
      `;
    });
    container.innerHTML = cardRepos.join("");
  } catch (error) {
    console.log(error.message);
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

apiGithub();
