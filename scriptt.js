// ── Photo lightbox + heart burst ──
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const heartsContainer = document.getElementById('hearts-container');

function openPhoto(el) {
  const src = el.querySelector('img').src;
  modalImg.src = src;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  burstHearts();
}

function closePhoto() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  heartsContainer.innerHTML = '';
}

function burstHearts() {
  heartsContainer.innerHTML = '';
  const count = 32;
  const heartEmojis = ['❤️','🩷','❤️','💕','❤️','🩷','💗','❤️'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.className = 'floating-heart';
      h.textContent = heartEmojis[i % heartEmojis.length];
      // random position across all 4 edges
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) { h.style.left = Math.random()*100+'vw'; h.style.top = '100vh'; }
      else if (edge === 1) { h.style.left = '0'; h.style.top = Math.random()*100+'vh'; }
      else if (edge === 2) { h.style.left = '100vw'; h.style.top = Math.random()*100+'vh'; }
      else { h.style.left = Math.random()*100+'vw'; h.style.top = '-2rem'; }
      h.style.setProperty('--r', (Math.random()*40 - 20)+'deg');
      heartsContainer.appendChild(h);
      setTimeout(() => h.remove(), 1500);
    }, i * 55);
  }
}

// close on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePhoto(); });

// ── 3-Theme switcher for Us page ──
// Themes: "floral" (default), "dark", "classic"
const root = document.documentElement;
const btnFloral = document.getElementById('btn-floral');
const btnDark = document.getElementById('btn-dark');
const btnClassic = document.getElementById('btn-classic');
const allBtns = [btnFloral, btnDark, btnClassic];

function getSavedTheme() {
  try { return localStorage.getItem('us-theme'); } catch (e) { return null; }
}
function saveTheme(value) {
  try { localStorage.setItem('us-theme', value); } catch (e) {}
}

function applyTheme(theme) {
  // remove any existing data-theme
  root.removeAttribute('data-theme');
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  if (theme === 'classic') root.setAttribute('data-theme', 'classic');
  // floral = no attribute (default CSS)

  // update active button
  allBtns.forEach(btn => btn.classList.remove('active'));
  if (theme === 'dark' && btnDark) btnDark.classList.add('active');
  else if (theme === 'classic' && btnClassic) btnClassic.classList.add('active');
  else if (btnFloral) btnFloral.classList.add('active');

  saveTheme(theme);
}

// Load saved theme
applyTheme(getSavedTheme() || 'floral');

// Button listeners
if (btnFloral) btnFloral.addEventListener('click', () => applyTheme('floral'));
if (btnDark) btnDark.addEventListener('click', () => applyTheme('dark'));
if (btnClassic) btnClassic.addEventListener('click', () => applyTheme('classic'));

// ── Heart mark easter egg ──
const heartMark = document.querySelector('.heart');
let clicks = 0;
if (heartMark) {
  heartMark.style.cursor = 'pointer';
  heartMark.addEventListener('click', () => {
    clicks++;
    heartMark.style.transition = 'transform 0.15s ease';
    heartMark.style.transform = `scale(${1 + clicks * 0.08})`;
    if (clicks >= 8) {
      heartMark.title = 'okay we get it, you two are adorable ♡';
    }
  });
}

// ── Console message ──
console.log('%c♡ E + B ♡  You found the secret page.', 'color:#E8456A; font-family:serif; font-size:15px;');