const messages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Plsss? 🥺",
    "I'll be very sad 😢",
    "I'll be very very very sad 😭",
    "Ok, I'll stop asking..."
];

// Spawn background hearts
function createExchangingHearts() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖'; // Random heart type
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7s float
    heart.style.fontSize = Math.random() * 20 + 20 + 'px'; // 20-40px

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createExchangingHearts, 500); // 2 hearts per second

// Cursor trail effect
document.addEventListener('mousemove', (e) => {
    // Throttling to avoid too many elements
    if (Math.random() < 0.85) return;

    const spark = document.createElement('div');
    spark.classList.add('particle');
    // Re-using particle class but overriding styles
    spark.style.background = `hsl(${Math.random() * 60 + 320}, 100%, 70%)`; // PInk/Red HSL
    spark.style.left = e.pageX + 'px';
    spark.style.top = e.pageY + 'px';
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.animation = 'fadeOut 1s forwards'; // We need to define fadeOut in CSS or just use simpler transition
    spark.style.pointerEvents = 'none';
    spark.style.position = 'absolute';

    // Add simple fade anim dynamically
    spark.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0) translate(0, 20px)' }
    ], {
        duration: 800,
        easing: 'ease-out'
    });

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
});

let messageIndex = 0;
let noClickCount = 0;

function handleNoClick() {
    const noBtn = document.querySelector('.btn-no');
    const yesBtn = document.querySelector('.btn-yes');

    noClickCount++;
    spawnSadEmojis(); // Trigger sad rain


    // Funny interactions logic
    if (noClickCount <= 5) {
        // Change text
        noBtn.innerText = messages[Math.min(noClickCount, messages.length - 1)];

        // Decrease No button size
        // Start from 1.2rem font-size and go down
        // We'll use style transform scale for smooth shrinking
        const currentScale = 1 - (noClickCount * 0.15); // Shrink by 15% each time
        noBtn.style.transform = `scale(${Math.max(0, currentScale)})`;

        // Increase Yes button size
        const currentYesScale = 1 + (noClickCount * 0.4); // Grow by 40% each time
        yesBtn.style.transform = `scale(${currentYesScale})`;

        // Optional: Move No button randomly a bit to make it harder (the "shy" logic from request)
        // If the user wants it to just disappear eventually, we stick to shrinking.

    }

    // Logic for "burst" effect after trying 2-3 times (user said 2-3, let's do it on the 4th or 5th click to make it dramatic)
    if (noClickCount >= 4) {
        // Create particle explosion
        createExplosion(noBtn);

        // Completely remove the No button
        noBtn.remove();

        // Make Yes button take over focus
        yesBtn.style.transform = "scale(2)";
        yesBtn.innerText = "YES!!!! ❤️";
        yesBtn.classList.add("pulse");
    }
}

function nextPage() {
    document.getElementById("proposal-card").classList.add("hidden");
    document.getElementById("success-card").classList.remove("hidden");

    // 🎵 Play Music
    const music = document.getElementById("bg-music");
    if (music) {
        music.play().catch(error => console.log("Audio play failed:", error));
    }

    // Launch confetti - Premium settings
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        // Set initial position
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        // Cleanup
        setTimeout(() => particle.remove(), 800);
    }
}

function spawnSadEmojis() {
    const emojis = ["😢", "😭", "💔", "😿", "🥺"];
    for (let i = 0; i < 8; i++) {
        const div = document.createElement('div');
        div.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        div.classList.add('crying-emoji');
        div.style.left = Math.random() * 100 + 'vw';
        div.style.fontSize = Math.random() * 30 + 20 + 'px';
        div.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(div);

        setTimeout(() => div.remove(), 5000);
    }
}
