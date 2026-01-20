const input = document.getElementById('username');
const btn = document.getElementById('searchBtn');
const result = document.getElementById('result');

async function buscarUsuario() {
  const user = input.value.trim();
  if (!user) return;

  result.innerHTML = '<p class="loading">Buscando usuário...</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }

    const data = await response.json();

    result.innerHTML = `
      <img src="${data.avatar_url}" width="100">
      <h2>${data.name || data.login}</h2>
      <p>Repositórios públicos: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">Ver perfil</a>
    `;
  } catch (error) {
    result.innerHTML = '<p class="error">Usuário não encontrado 😕</p>';
  }
}

btn.addEventListener('click', buscarUsuario);

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    buscarUsuario();
  }
});

