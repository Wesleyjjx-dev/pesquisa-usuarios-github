const input = document.getElementById('username');
const btn = document.getElementById('searchBtn');
const result = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');

// ===== GARANTIA: só roda se o botão existir =====
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ Modo claro';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.textContent = isDark
      ? '☀️ Modo claro'
      : '🌙 Modo escuro';
  });
}

// ===== FUNÇÃO DE BUSCA =====
async function buscarUsuario() {
  const user = input.value.trim();
  if (!user) return;

  result.innerHTML = '<p class="loading">Buscando usuário...</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) throw new Error();

    const data = await response.json();

    result.innerHTML = `
      <img src="${data.avatar_url}" width="100">
      <h2>${data.name || data.login}</h2>
      ${data.bio ? `<p>${data.bio}</p>` : ''}
      <p>👥 ${data.followers} seguidores · ${data.following} seguindo</p>
      ${data.location ? `<p>📍 ${data.location}</p>` : ''}
      <a href="${data.html_url}" target="_blank">Ver perfil</a>
    `;
  } catch {
    result.innerHTML = '<p class="error">Usuário não encontrado 😕</p>';
  }
}

// ===== EVENTOS =====
btn.addEventListener('click', buscarUsuario);

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    buscarUsuario();
  }
});
