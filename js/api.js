export async function getGithubRepos(repos) {
  try {
    const response = await fetch("https://api.github.com/users/anabeatm/repos");

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const allRepos = await response.json();

    return allRepos.filter((repo) => repos.includes(repo.name));
  } catch (error) {
    const errorMsg = error.message || "Erro desconhecido na requisição.";
    containerNode.innerHTML =
      currentLang === "pt"
        ? `<p style="color: #d9534f;"><strong>Erro ao carregar os projetos da API do GitHub.</strong><br><small>Detalhes: ${errorMsg}</small></p>`
        : `<p style="color: #d9534f;"><strong>An error occurred while loading projects from the GitHub API.</strong><br><small>Details: ${errorMsg}</small></p>`;
  }
}

export async function getWeather(latitude, longitude, apiKey) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=pt`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch Weather API");
    }

    return await response.json();
  } catch (error) {
    const errorMsg = error.message || "Erro desconhecido na requisição.";
    containerNode.innerHTML =
      currentLang === "pt"
        ? `<p style="color: #d9534f;"><strong>Erro ao carregar os dados da API de Clima.</strong><br><small>Detalhes: ${errorMsg}</small></p>`
        : `<p style="color: #d9534f;"><strong>An error occurred while loading data from the Weather API.</strong><br><small>Details: ${errorMsg}</small></p>`;
  }
}
