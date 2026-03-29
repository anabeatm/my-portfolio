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
    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const themeIcon = toggleThemeBtn.querySelector("img");

      if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "assets/svg/moon-solid-full.svg";
      } else {
        themeIcon.src = "assets/svg/sun-solid-full.svg";
      }
    });
  }

  if (toggleMusicBtn && musicPlayerContainer) {
    toggleMusicBtn.addEventListener("click", () => {
      musicPlayerContainer.classList.toggle("hidden");
    });
  }
}
