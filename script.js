const input = document.getElementById('username');
const btn = document.getElementById('searchBtn');
const result = document.getElementById('result');

btn.addEventListener('click', async () => {
  const user = input.value.trim();
  if (!user) return;

  result.innerHTML = '<p class="loading">Buscando usuário...</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) throw new Error('Usuário não encontrado');

    const data = await response.json();

    result.innerHTML = `
      <img src="${data.avatar_url}" width="100">
      <h2>${data.name || data.login}</h2>
      <p>Repositórios: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">Ver perfil</a>
    `;
  } catch (error) {
    result.innerHTML = '<p class="error">Usuário não encontrado 😕</p>';
  }
});
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btn.click();
  }
});
