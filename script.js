document.addEventListener('DOMContentLoaded', () => {
    // State & Variables
    let currentScreenId = 'screen-loader';
    let poppedBalloons = 0;

    // Elements
    const fillBar = document.getElementById('progress-fill');
    const startBtn = document.getElementById('btn-start');
    const decorateBtn = document.getElementById('btn-decorate');
    const lightBtn = document.getElementById('btn-light');
    const nextBalloonsBtn = document.getElementById('btn-next-balloons');
    const nextMessageBtn = document.getElementById('btn-next-message');
    const envelope = document.getElementById('envelope');
    const nextGiftBtn = document.getElementById('btn-next-gift');
    const giftBox = document.getElementById('gift-box');

    // Utility to switch screens
    function switchScreen(newScreenId) {
        document.getElementById(currentScreenId).classList.remove('active');
        setTimeout(() => {
            document.getElementById(currentScreenId).classList.add('hidden');
            document.getElementById(newScreenId).classList.remove('hidden');
            
            // Force reflow
            void document.getElementById(newScreenId).offsetWidth;
            
            document.getElementById(newScreenId).classList.add('active');
            currentScreenId = newScreenId;
        }, 600); // matches CSS transition time
    }

    // 1. Loader Logic
    setTimeout(() => { fillBar.style.width = '30%'; }, 500);
    setTimeout(() => { fillBar.style.width = '70%'; }, 1500);
    setTimeout(() => { 
        fillBar.style.width = '100%'; 
        setTimeout(() => switchScreen('screen-start'), 500);
    }, 2500);

    // 2. Start Button
    startBtn.addEventListener('click', () => {
        switchScreen('screen-cake');
    });

    // 3. Decorate Button
    decorateBtn.addEventListener('click', () => {
        document.getElementById('bunting').classList.add('show');
        document.getElementById('candle').style.display = 'block';
        decorateBtn.style.display = 'none';
        lightBtn.style.display = 'inline-block';
    });

    // 4. Light Candle Button
    lightBtn.addEventListener('click', () => {
        document.getElementById('flame').style.display = 'block';
        document.getElementById('cake-greeting').classList.add('show');
        lightBtn.style.display = 'none';
        nextBalloonsBtn.style.display = 'inline-block';
        fireConfetti(50);
    });

    // 5. To Balloons Screen
    nextBalloonsBtn.addEventListener('click', () => {
        switchScreen('screen-balloons');
    });

    // 6. Balloon Pop Logic (Attached globally for inline onclick)
    window.popBalloon = function(element) {
        if (element.style.transform === 'scale(0)') return; // already popped
        
        element.style.transform = 'scale(0)';
        const word = element.previousElementSibling;
        word.style.opacity = '1';
        
        poppedBalloons++;
        fireConfetti(15);

        if (poppedBalloons === 4) {
            document.getElementById('balloon-instructions').innerText = "You're perfect!";
            nextMessageBtn.classList.remove('disabled-btn');
            nextMessageBtn.disabled = false;
            setTimeout(() => fireConfetti(100), 500); // Big celebration
        }
    };

    // 7. To Message Screen
    nextMessageBtn.addEventListener('click', () => {
        switchScreen('screen-message');
    });

    // 8. Open Envelope
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            nextGiftBtn.style.display = 'inline-block';
        }, 1500);
    });

    // 9. To Final Gift Screen
    nextGiftBtn.addEventListener('click', () => {
        switchScreen('screen-gift');
    });

    // 10. Open Gift Box
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        fireConfetti(80);
        setTimeout(() => {
            document.getElementById('final-message').classList.add('show');
        }, 500);
    });

    // --- Confetti Generator ---
    function fireConfetti(amount) {
        const container = document.getElementById('confetti-container');
        const colors = ['#f3a6c2', '#e2cbff', '#ffdac1', '#ffb6c1', '#ffd700'];
        
        for (let i = 0; i < amount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            confetti.style.opacity = Math.random() + 0.5;
            
            container.appendChild(confetti);
            
            // cleanup
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});
