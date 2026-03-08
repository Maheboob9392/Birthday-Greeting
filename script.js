/* ============================================
   BIRTHDAY SURPRISE — script.js
   ============================================ */

'use strict';

/* ─── GLOBALS ─── */
let poppedCount     = 0;
const totalBalloons = 4;
const poppedMap     = {};   // { index → word } — rebuilt in order always

/* ══════════════════════════════════════════
   SCREEN NAVIGATION
══════════════════════════════════════════ */
function goTo(targetId) {
  const current = document.querySelector('.screen.active');
  const target  = document.getElementById(targetId);
  if (!target) return;

  if (current) {
    current.style.opacity      = '0';
    current.style.pointerEvents = 'none';
    setTimeout(() => current.classList.remove('active'), 600);
  }

  setTimeout(() => {
    target.classList.add('active');
    target.style.opacity       = '';
    target.style.pointerEvents = '';
    onScreenEnter(targetId);
  }, 300);
}

function onScreenEnter(id) {
  if (id === 'screen-hbd')  initHbdScreen();
  if (id === 'screen-gift') spawnConfetti('gift-confetti', 60);
}

/* ══════════════════════════════════════════
   LOADER
══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const bar      = document.getElementById('loader-bar');
  let   progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      setTimeout(() => goTo('screen-welcome'), 700);
    }
    bar.style.width = progress + '%';
  }, 60);

  setInterval(() => spawnScreenSparkle('screen-loader'), 500);
});

/* ══════════════════════════════════════════
   CAKE — DECORATE
══════════════════════════════════════════ */
function decorateCake() {
  const bunting = document.getElementById('bunting-cake');
  bunting.style.display    = 'block';
  bunting.style.opacity    = '0';
  bunting.style.transform  = 'translateY(-20px)';
  bunting.style.transition = 'all 0.6s ease';
  requestAnimationFrame(() => {
    bunting.style.opacity   = '1';
    bunting.style.transform = 'translateY(0)';
  });

  spawnConfetti('cake-confetti', 25);

  document.getElementById('btn-decorate').style.display = 'none';
  const btnLight = document.getElementById('btn-light');
  btnLight.style.display    = 'inline-flex';
  btnLight.style.opacity    = '0';
  btnLight.style.transform  = 'scale(0.8)';
  btnLight.style.transition = 'all 0.4s ease 0.3s';
  requestAnimationFrame(() => {
    btnLight.style.opacity   = '1';
    btnLight.style.transform = 'scale(1)';
  });
}

/* ─── LIGHT THE CANDLE ─── */
function lightCandle() {
  const flame = document.getElementById('candle-flame');
  flame.style.display    = 'block';
  flame.style.opacity    = '0';
  flame.style.transform  = 'scale(0)';
  flame.style.transition = 'all 0.5s cubic-bezier(.22,1,.36,1)';
  requestAnimationFrame(() => {
    flame.style.opacity   = '1';
    flame.style.transform = 'scale(1)';
  });

  document.getElementById('btn-light').style.display = 'none';
  document.getElementById('cake-scene').style.filter =
    'drop-shadow(0 0 20px rgba(255,180,0,0.4))';

  setTimeout(() => goTo('screen-hbd'), 500);
}

/* ══════════════════════════════════════════
   HBD SCREEN
══════════════════════════════════════════ */
function initHbdScreen() {
  spawnConfetti('hbd-confetti', 50);
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnScreenSparkle('screen-hbd'), i * 80);
  }
}

/* ══════════════════════════════════════════
   BALLOON GAME
   Each balloon has data-index (0-3).
   Sentence is always rebuilt in index order
   → correct regardless of tap sequence.
══════════════════════════════════════════ */
function popBalloon(item) {
  if (item.classList.contains('popped')) return;
  item.classList.add('popped');

  const idx  = parseInt(item.getAttribute('data-index'), 10);
  const word = item.getAttribute('data-word');
  poppedMap[idx] = word;
  poppedCount++;

  createPopParticles(item);

  /* Rebuild sentence in fixed 0→1→2→3 order */
  const sentence = [0,1,2,3]
    .filter(i => poppedMap[i] !== undefined)
    .map(i => poppedMap[i])
    .join(' ');

  const msg = document.getElementById('popped-message');
  setTimeout(() => {
    msg.textContent      = sentence;
    msg.style.transition = 'transform 0.2s';
    msg.style.transform  = 'scale(1.12)';
    setTimeout(() => { msg.style.transform = 'scale(1)'; }, 200);
  }, 300);

  if (poppedCount === totalBalloons) {
    setTimeout(() => allBalloonsPopped(), 650);
  }
}

function createPopParticles(item) {
  const rect   = item.getBoundingClientRect();
  const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#ff6b9d'];
  for (let i = 0; i < 12; i++) {
    const p     = document.createElement('div');
    const angle = (i / 12) * 360;
    const dist  = 45 + Math.random() * 55;
    p.style.cssText = `
      position:fixed;
      width:${5 + Math.random() * 6}px;
      height:${5 + Math.random() * 6}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:50%;
      pointer-events:none;
      z-index:999;
      left:${rect.left + rect.width / 2}px;
      top:${rect.top  + rect.height / 2}px;
      transition: all 0.7s ease-out;
      opacity:1;
    `;
    document.body.appendChild(p);
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    requestAnimationFrame(() => {
      p.style.transform = `translate(${dx}px, ${dy}px)`;
      p.style.opacity   = '0';
    });
    setTimeout(() => p.remove(), 800);
  }
}

function allBalloonsPopped() {
  const screen = document.getElementById('screen-balloons');

  /* Confetti burst */
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#fff176','#80deea'];
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.cssText = `
        left:${Math.random() * 100}%; top:0;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration:${1.2 + Math.random()}s;
        animation-delay:${Math.random() * 0.3}s;
      `;
      screen.appendChild(p);
      setTimeout(() => p.remove(), 2200);
    }, i * 28);
  }

  /* Show Next button */
  const nextBtn = document.getElementById('btn-balloon-next');
  nextBtn.style.display   = 'inline-flex';
  nextBtn.style.opacity   = '0';
  nextBtn.style.transform = 'scale(0.8)';
  setTimeout(() => {
    nextBtn.style.transition = 'all 0.5s ease';
    nextBtn.style.opacity    = '1';
    nextBtn.style.transform  = 'scale(1)';
  }, 700);
}

/* ══════════════════════════════════════════
   LETTER / MESSAGE CARD
══════════════════════════════════════════ */
function openLetter() {
  const wrap = document.getElementById('letter-wrap');
  if (wrap.classList.contains('opened')) return;
  wrap.classList.add('opened');
  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnScreenSparkle('screen-message'), i * 100);
  }
}

/* ══════════════════════════════════════════
   GIFT BOX
══════════════════════════════════════════ */
function openGift() {
  const box    = document.getElementById('gift-box');
  const hint   = document.getElementById('gift-tap-hint');
  const reveal = document.getElementById('gift-reveal');
  if (box.classList.contains('opened')) return;

  box.classList.add('opened');

  if (!document.getElementById('shake-style')) {
    const s = document.createElement('style');
    s.id = 'shake-style';
    s.textContent = `
      @keyframes shake {
        0%,100% { transform: rotate(0); }
        25%      { transform: rotate(-6deg) scale(1.05); }
        75%      { transform: rotate( 6deg) scale(1.05); }
      }
    `;
    document.head.appendChild(s);
  }
  box.style.animation = 'shake 0.3s ease';

  setTimeout(() => {
    hint.style.display   = 'none';
    reveal.style.display = 'block';
    spawnConfetti('gift-confetti', 80);
    for (let i = 0; i < 18; i++) {
      setTimeout(() => spawnScreenSparkle('screen-gift'), i * 55);
    }
  }, 700);
}

/* ══════════════════════════════════════════
   REPLAY
══════════════════════════════════════════ */
function replayAll() {
  /* Reset balloons */
  poppedCount = 0;
  for (const k in poppedMap) delete poppedMap[k];

  document.querySelectorAll('.balloon-item').forEach(b => {
    b.classList.remove('popped');
    [b.querySelector('.balloon'), b.querySelector('.balloon-word')].forEach(el => {
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetHeight;     // force reflow to restart animations
      el.style.animation = '';
    });
  });

  const msg = document.getElementById('popped-message');
  msg.textContent  = '';
  msg.style.color  = '';
  msg.style.fontSize = '';
  document.getElementById('btn-balloon-next').style.display = 'none';

  /* Reset letter */
  document.getElementById('letter-wrap').classList.remove('opened');

  /* Reset gift */
  const box = document.getElementById('gift-box');
  box.classList.remove('opened');
  box.style.animation = '';
  document.getElementById('gift-tap-hint').style.display = 'block';
  document.getElementById('gift-reveal').style.display   = 'none';

  /* Reset cake */
  document.getElementById('candle-flame').style.display = 'none';
  document.getElementById('bunting-cake').style.display = 'none';
  document.getElementById('btn-decorate').style.display = 'inline-flex';
  document.getElementById('btn-light').style.display    = 'none';
  document.getElementById('cake-scene').style.filter    = '';

  goTo('screen-welcome');
}

/* ══════════════════════════════════════════
   CONFETTI & SPARKLE HELPERS
══════════════════════════════════════════ */
function spawnConfetti(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#fff176','#80deea','#f48fb1'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${-10 - Math.random() * 20}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      width:${5 + Math.random() * 7}px;
      height:${5 + Math.random() * 9}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration:${1.2 + Math.random() * 1.2}s;
      animation-delay:${Math.random() * 0.6}s;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2800);
  }
}

function spawnScreenSparkle(screenId) {
  const screen = document.getElementById(screenId);
  if (!screen) return;
  const emojis = ['✨','⭐','💫','🌟','✦','❋','🌸'];
  const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb'];
  const s = document.createElement('span');
  s.className   = 'sparkle';
  s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  s.style.cssText = `
    left:${Math.random() * 90}%;
    top:${Math.random() * 90}%;
    color:${colors[Math.floor(Math.random() * colors.length)]};
    z-index:20;
  `;
  screen.appendChild(s);
  setTimeout(() => s.remove(), 900);
}
