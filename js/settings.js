export function initSettings() {
  const toggleSettingsBtn = document.getElementById("toggle-settings-btn");
  const settingsModal = document.getElementById("settings-modal");

  const toggleThemeBtn = document.getElementById("toggle-theme-btn");
  const toggleMusicBtn = document.getElementById("toggle-music-btn");
  const musicPlayerContainer = document.getElementById("mini-player-container");

  if (toggleSettingsBtn && settingsModal) {
    toggleSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.toggle("show");
    });
  }

  if (toggleThemeBtn) {
    const themeIcon = toggleThemeBtn.querySelector("img");
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.body.classList.add("dark-mode");
      themeIcon.src = "assets/svg/moon-solid-full.svg";
    } else {
      themeIcon.src = "assets/svg/sun-solid-full.svg";
    }
    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      if (isDarkMode) {
        themeIcon.src = "assets/svg/moon-solid-full.svg";
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        themeIcon.src = "assets/svg/sun-solid-full.svg";
        localStorage.setItem("portfolio-theme", "light");
      }
    });
  }

  if (toggleMusicBtn && musicPlayerContainer) {
    toggleMusicBtn.addEventListener("click", () => {
      musicPlayerContainer.classList.toggle("hidden");
    });
  }
}
