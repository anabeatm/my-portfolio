export async function getGithubRepos(repos) {
  try {
    const response = await fetch("https://api.github.com/users/anabeatm/repos");

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const allRepos = await response.json();

    return allRepos.filter((repo) => repos.includes(repo.name));
  } catch (error) {
    console.error("GitHub API error: ", error);
    throw error;
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
      console.error("Weather API error: ", error);
      throw error;
  }
}
