const translations = {
  en: {
    greeting: "Hey, I'm Ana Beatriz!",
    role: "&lt;student & front-end developer&gt;",
    about: "&lt;about&gt;",
    projects: "&lt;projects&gt;",
    contact: "&lt;contact&gt;",
    path: "&lt;path&gt;",
    copyright: "created with coffee and inspired by",
  },
  pt: {
    greeting: "Olá, sou a Ana Beatriz!",
    role: "&lt;estudante & desenvolvedora front-end&gt;",
    about: "&lt;sobre&gt;",
    projects: "&lt;projetos&gt;",
    contact: "&lt;contato&gt;",
    path: "&lt;trajetória&gt;",
    copyright: "feito com muito café e inspirado por",
  },
};

export function initLang() {
  const langBtn = document.getElementById("toggle-lang-btn");
  if (!langBtn) return;
  let currentLang = localStorage.getItem("portfolio-lang") || "en";
  updateScreen(currentLang);

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "pt" : "en";
    localStorage.setItem("portfolio-lang", currentLang);

    updateScreen(currentLang);
  });
  function updateScreen(lang) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    langBtn.textContent = lang === "en" ? "🇧🇷" : "🇺🇸";
  }
}
