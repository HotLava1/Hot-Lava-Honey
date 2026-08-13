const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();


const languageSelect = document.getElementById('language-select');

languageSelect?.addEventListener('change', event => {
  const language = event.target.value;
  if (!language) return;

  const pageUrl = new URL(window.location.href);
  pageUrl.search = '';
  pageUrl.hash = '';

  if (language === 'en') {
    window.location.assign(pageUrl.toString());
    return;
  }

  const translateUrl = new URL('https://translate.google.com/translate');
  translateUrl.searchParams.set('sl', 'en');
  translateUrl.searchParams.set('tl', language);
  translateUrl.searchParams.set('u', pageUrl.toString());
  window.location.assign(translateUrl.toString());
});
