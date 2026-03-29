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
