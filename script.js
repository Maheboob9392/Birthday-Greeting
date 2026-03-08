/* ============================================
   BIRTHDAY SURPRISE — script.js
   ============================================ */

'use strict';

/* ── GLOBALS ── */
let poppedCount = 0;
const poppedWords = [];
const totalBalloons = 4;

/* ══════════════════════════════════════════
   SCREEN NAVIGATION
══════════════════════════════════════════ */
function goTo(targetId) {
  const current = document.querySelector('.screen.active');
  const target  = document.getElementById(targetId);
  if (!target) return;

  if (current) {
    current.style.opacity = '0';
    current.style.pointerEvents = 'none';
    setTimeout(() => current.classList.remove('active'), 600);
  }

  setTimeout(() => {
    target.classList.add('active');
    target.style.opacity = '';
    target.style.pointerEvents = '';
    onScreenEnter(targetId);
  }, 300);
}

function onScreenEnter(id) {
  if (id === 'screen-hbd')   initHbdScreen();
  if (id === 'screen-gift')  spawnConfetti('gift-confetti', 60);
}

/* ══════════════════════════════════════════
   LOADER
══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('loader-bar');
  let progress = 0;
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

  // Loader sparkles
  setInterval(() => spawnScreenSparkle('screen-loader'), 500);
});

/* ══════════════════════════════════════════
   CAKE — DECORATE
══════════════════════════════════════════ */
function decorateCake() {
  const bunting = document.getElementById('bunting-cake');
  bunting.style.display = 'block';

  // Animate bunting in
  bunting.style.opacity = '0';
  bunting.style.transform = 'translateY(-20px)';
  bunting.style.transition = 'all 0.6s ease';
  requestAnimationFrame(() => {
    bunting.style.opacity = '1';
    bunting.style.transform = 'translateY(0)';
  });

  // Sprinkle confetti
  spawnConfetti('cake-confetti', 25);

  // Swap button
  document.getElementById('btn-decorate').style.display = 'none';
  const btnLight = document.getElementById('btn-light');
  btnLight.style.display = 'inline-flex';
  btnLight.style.opacity = '0';
  btnLight.style.transform = 'scale(0.8)';
  btnLight.style.transition = 'all 0.4s ease 0.3s';
  requestAnimationFrame(() => {
    btnLight.style.opacity = '1';
    btnLight.style.transform = 'scale(1)';
  });
}

/* ── LIGHT THE CANDLE ── */
function lightCandle() {
  const flame = document.getElementById('candle-flame');
  flame.style.display = 'block';
  flame.style.opacity = '0';
  flame.style.transform = 'scale(0)';
  flame.style.transition = 'all 0.3s cubic-bezier(.22,1,.36,1)';
  requestAnimationFrame(() => {
    flame.style.opacity = '1';
    flame.style.transform = 'scale(1)';
  });

  document.getElementById('btn-light').style.display = 'none';

  // Warm glow on cake
  const cakeScene = document.getElementById('cake-scene');
  cakeScene.style.filter = 'drop-shadow(0 0 20px rgba(255,180,0,0.4))';

  // Transition after a beat
  setTimeout(() => goTo('screen-hbd'), 1000);
}

/* ══════════════════════════════════════════
   HBD SCREEN
══════════════════════════════════════════ */
function initHbdScreen() {
  spawnConfetti('hbd-confetti', 50);
  // Sparkle burst
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnScreenSparkle('screen-hbd'), i * 80);
  }
}

/* ══════════════════════════════════════════
   BALLOON GAME
══════════════════════════════════════════ */
function popBalloon(item) {
  if (item.classList.contains('popped')) return;
  item.classList.add('popped');

  const word = item.getAttribute('data-word');
  poppedWords.push(word);
  poppedCount++;

  // Pop particles burst
  createPopParticles(item);

  // Update the running sentence display below
  const msg = document.getElementById('popped-message');
  setTimeout(() => {
    msg.textContent = poppedWords.join(' ');
    msg.style.transform = 'scale(1.1)';
    setTimeout(() => { msg.style.transform = 'scale(1)'; msg.style.transition = 'transform 0.2s'; }, 180);
  }, 280);

  if (poppedCount === totalBalloons) {
    setTimeout(() => allBalloonsPopped(), 600);
  }
}

function createPopParticles(item) {
  const rect    = item.getBoundingClientRect();
  const screen  = document.getElementById('screen-balloons');
  const colors  = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#ff6b9d'];
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed; width:${5+Math.random()*6}px; height:${5+Math.random()*6}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:50%; pointer-events:none; z-index:999;
      left:${rect.left + rect.width/2}px; top:${rect.top + rect.height/2}px;
      transition: all 0.7s ease-out; opacity:1;
    `;
    document.body.appendChild(p);
    const angle = (i / 10) * 360;
    const dist  = 50 + Math.random() * 60;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist;
    requestAnimationFrame(() => {
      p.style.transform = `translate(${dx}px, ${dy}px)`;
      p.style.opacity = '0';
    });
    setTimeout(() => p.remove(), 750);
  }
}

function allBalloonsPopped() {
  // Big confetti burst via screen
  const screen = document.getElementById('screen-balloons');
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#fff176','#80deea'];
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.cssText = `
        left:${Math.random()*100}%; top:0;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-duration:${1.2+Math.random()}s;
        animation-delay:${Math.random()*0.3}s;
      `;
      screen.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }, i * 30);
  }

  const msg = document.getElementById('popped-message');
  msg.style.color = '#7b4fa6';
  msg.style.fontSize = '1.35rem';

  const nextBtn = document.getElementById('btn-balloon-next');
  nextBtn.style.display = 'inline-flex';
  nextBtn.style.opacity = '0';
  nextBtn.style.transform = 'scale(0.8)';
  setTimeout(() => {
    nextBtn.style.transition = 'all 0.5s ease';
    nextBtn.style.opacity = '1';
    nextBtn.style.transform = 'scale(1)';
  }, 600);
}

/* ══════════════════════════════════════════
   LETTER OPEN
══════════════════════════════════════════ */
function openLetter() {
  const wrap = document.getElementById('letter-wrap');
  if (wrap.classList.contains('opened')) return;
  wrap.classList.add('opened');

  // Subtle sparkles
  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnScreenSparkle('screen-message'), i * 100);
  }
}

/* ══════════════════════════════════════════
   GIFT BOX
══════════════════════════════════════════ */
function openGift() {
  const box  = document.getElementById('gift-box');
  const hint = document.getElementById('gift-tap-hint');
  const reveal = document.getElementById('gift-reveal');
  if (box.classList.contains('opened')) return;

  box.classList.add('opened');

  // Shake before lid flies
  box.style.animation = 'shake 0.3s ease';
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:rotate(0)}
      25%{transform:rotate(-6deg) scale(1.05)}
      75%{transform:rotate(6deg) scale(1.05)}
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    hint.style.display = 'none';
    reveal.style.display = 'block';
    spawnConfetti('gift-confetti', 80);
    for (let i = 0; i < 16; i++) {
      setTimeout(() => spawnScreenSparkle('screen-gift'), i * 60);
    }
  }, 700);
}

/* ══════════════════════════════════════════
   REPLAY
══════════════════════════════════════════ */
function replayAll() {
  // Reset state
  poppedCount = 0;
  poppedWords.length = 0;

  // Reset balloons — force reflow so CSS animations replay cleanly
  document.querySelectorAll('.balloon-item').forEach(b => {
    b.classList.remove('popped');
    const wordEl = b.querySelector('.balloon-word');
    if (wordEl) {
      // Force reflow to reset animation
      wordEl.style.animation = 'none';
      wordEl.offsetHeight; // trigger reflow
      wordEl.style.animation = '';
    }
    const balloonEl = b.querySelector('.balloon');
    if (balloonEl) {
      balloonEl.style.animation = 'none';
      balloonEl.offsetHeight;
      balloonEl.style.animation = '';
    }
  });
  document.getElementById('popped-message').textContent = '';
  document.getElementById('btn-balloon-next').style.display = 'none';

  // Reset letter
  document.getElementById('letter-wrap').classList.remove('opened');

  // Reset gift
  const box = document.getElementById('gift-box');
  box.classList.remove('opened');
  document.getElementById('gift-tap-hint').style.display = 'block';
  document.getElementById('gift-reveal').style.display = 'none';

  // Reset cake
  document.getElementById('candle-flame').style.display = 'none';
  document.getElementById('bunting-cake').style.display = 'none';
  document.getElementById('btn-decorate').style.display = 'inline-flex';
  document.getElementById('btn-light').style.display = 'none';
  document.getElementById('cake-scene').style.filter = '';

  goTo('screen-welcome');
}

/* ══════════════════════════════════════════
   CONFETTI HELPERS
══════════════════════════════════════════ */
function spawnConfetti(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb','#fff176','#80deea','#f48fb1'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random()*100}%; top:${-10-Math.random()*20}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${5+Math.random()*7}px; height:${5+Math.random()*9}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      animation-duration:${1.2+Math.random()*1.2}s;
      animation-delay:${Math.random()*0.6}s;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2800);
  }
}

function spawnScreenSparkle(screenId) {
  const screen = document.getElementById(screenId);
  if (!screen) return;
  const emojis = ['✨','⭐','💫','🌟','✦','❋'];
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  s.style.cssText = `
    left:${Math.random()*90}%; top:${Math.random()*90}%;
    color:${['#ff9bb5','#c5b3e6','#ffcba4','#b39ddb'][Math.floor(Math.random()*4)]};
    z-index:20;
  `;
  screen.appendChild(s);
  setTimeout(() => s.remove(), 900);
}
