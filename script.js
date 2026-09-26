const themeToggle = document.querySelector('.theme-toggle');
themeToggle.hidden = false;
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeToggle.title = themeToggle.getAttribute('aria-label');
}
updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('yw-theme', theme); } catch {}
  updateThemeLabel();
});

const papers = [...document.querySelectorAll('.publication')];
const filters = [...document.querySelectorAll('[data-filter]')];
const searchInput = document.querySelector('#paper-search');
const showAllButton = document.querySelector('.show-publications');
let currentFilter = 'all';
let expanded = false;
document.querySelector('.publication-toolbar').hidden = false;
function updatePapers() {
  const query = searchInput.value.trim().toLowerCase();
  const matching = papers.filter(paper =>
    (currentFilter === 'all' || paper.dataset.topics.split(' ').includes(currentFilter)) &&
    paper.textContent.toLowerCase().includes(query)
  );
  const limit = expanded || query || currentFilter !== 'all' ? matching.length : 6;
  const visible = new Set(matching.slice(0, limit));
  papers.forEach(paper => { paper.hidden = !visible.has(paper); });
  document.querySelector('#results-count').textContent = `Showing ${visible.size} of ${matching.length} publications`;
  document.querySelector('.empty-results').hidden = matching.length !== 0;
  showAllButton.hidden = Boolean(query) || currentFilter !== 'all' || matching.length <= 6;
  showAllButton.innerHTML = expanded ? 'Show fewer publications <span aria-hidden="true">↑</span>' : `Show all ${matching.length} publications <span aria-hidden="true">↓</span>`;
  showAllButton.setAttribute('aria-expanded', String(expanded));
}
filters.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  updatePapers();
}));
searchInput.addEventListener('input', updatePapers);
showAllButton.addEventListener('click', () => {
  expanded = !expanded;
  updatePapers();
  if (!expanded) document.querySelector('#publications').scrollIntoView({ behavior: 'auto' });
});
updatePapers();

const dialog = document.querySelector('#video-dialog');
let videoOpener;
document.querySelectorAll('.video-trigger').forEach(link => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  videoOpener = link;
  document.querySelector('#video-title').textContent = link.dataset.title;
  document.querySelector('#video-external').href = link.href;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(link.dataset.video)}?autoplay=1&rel=0`;
  iframe.title = link.dataset.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  dialog.querySelector('.video-container').replaceChildren(iframe);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  dialog.querySelector('.video-container').replaceChildren();
  document.body.style.overflow = '';
  videoOpener?.focus();
});

const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('.site-header nav a')];
let pending = false;
function updateNavigation() {
  let current = sections[0].id;
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) current = section.id; });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20) current = 'contact';
  navLinks.forEach(link => {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
updateNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
