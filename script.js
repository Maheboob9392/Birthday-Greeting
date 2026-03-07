document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    setTimeout(() => {
        nextScreen('screen-loader', 'screen-start');
    }, 3200); // Wait for progress bar animation
});

// Screen transition function
function nextScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreenElement = document.getElementById(nextId);
    
    currentScreen.style.opacity = '0';
    setTimeout(() => {
        currentScreen.classList.remove('active');
        nextScreenElement.classList.add('active');
        // Slight delay for fade-in effect
        setTimeout(() => {
            nextScreenElement.style.opacity = '1';
        }, 50);
    }, 600); // Matches CSS transition time
}

// 3. Decorate Cake
function decorate() {
    document.getElementById('banners').classList.add('show');
    document.getElementById('candle').style.display = 'block';
    
    document.getElementById('btn-decorate').classList.add('hide');
    document.getElementById('btn-light').classList.remove('hide');
}

// 4. Light Candle
function lightCandle() {
    document.getElementById('flame').classList.add('active');
    document.getElementById('birthday-greeting').classList.remove('hide');
    
    document.getElementById('btn-light').classList.add('hide');
    document.getElementById('btn-next-balloons').classList.remove('hide');
    
    triggerConfetti();
}

// 5 & 6. Balloon Logic
let poppedCount = 0;
function popBalloon(balloonElement) {
    if (balloonElement.classList.contains('popped')) return;
    
    // Play a small pop effect (CSS visual change)
    balloonElement.classList.add('popped');
    
    // Show hidden word
    const hiddenWord = balloonElement.previousElementSibling;
    hiddenWord.classList.add('show');
    
    poppedCount++;
    if (poppedCount === 4) {
        triggerConfetti();
        document.getElementById('btn-next-card').classList.remove('disabled');
    }
}

// 7. Special Message
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        document.getElementById('btn-next-gift').classList.remove('hide');
    }
}

// 8. Final Gift Note
function openGift() {
    const box = document.querySelector('.gift-box');
    const notes = document.getElementById('gift-notes');
    
    if (!box.classList.contains('open')) {
        box.classList.add('open');
        notes.classList.remove('hide');
        
        const noteElements = document.querySelectorAll('.note');
        noteElements.forEach(note => {
            note.classList.add('show');
        });
        
        triggerConfetti();
    }
}

// Confetti Generator
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ffb6c1', '#ffd700', '#ff69b4', '#87ceeb', '#dda0dd'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        // Randomize properties
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(confetti);
        
        // Cleanup after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
