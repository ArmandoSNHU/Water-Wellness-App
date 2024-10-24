document.addEventListener('DOMContentLoaded', () => {
    updateProgress(); // Initialize progress on load

    // Listen for "Enter" key to save the daily goal
    const goalInput = document.getElementById('goal-input');
    goalInput.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            saveGoal();
        }
    });
});

function saveGoal() {
    const goalInput = document.getElementById('goal-input');
    const newGoal = parseInt(goalInput.value);
    if (!newGoal || newGoal <= 0) {
        alert("Please enter a valid goal.");
        return;
    }

    // Update the progress bar max value
    const progressBar = document.getElementById('progress-bar');
    progressBar.max = newGoal;

    // Recalculate progress with the new goal
    const totalDrank = parseInt(document.getElementById('total-drank').textContent.split(' ')[0]);
    updateProgress(totalDrank);
}

function addWater() {
    const amountInput = document.getElementById('amount');
    let amount = parseInt(amountInput.value);
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const totalDrankEl = document.getElementById('total-drank');
    let totalDrank = parseInt(totalDrankEl.textContent.split(' ')[0]);
    totalDrank += amount;

    // Update total drank
    totalDrankEl.textContent = `${totalDrank} ml`;

    // Update progress bar
    updateProgress(totalDrank);

    // Play water sound
    playWaterSound();

    // Clear input field
    amountInput.value = '';
}

function playWaterSound() {
    const audio = document.getElementById('water-sound');
    audio.play();
    
    // Stop the audio after 1 second
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset the audio playback
    }, 1000);
}

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = 1; // Reset opacity

    const confettiCount = 150;
    const confettiArray = [];
    const colors = ['#FFC700', '#FF0000', '#00FF00', '#0000FF', '#FF69B4'];

    let animationFrameId;

    function ConfettiPiece() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;

        this.draw = function () {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        };

        this.update = function () {
            this.y += this.speed;
            if (this.y > canvas.height) this.y = -this.size;
            this.rotation += this.speed;
            this.draw();
        };
    }

    function initConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confettiArray.push(new ConfettiPiece());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiArray.forEach((confetti) => confetti.update());
        animationFrameId = requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    // Fade out and stop after 4 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrameId); // Stop the animation

        // Gradually reduce the canvas opacity over 1 second
        let fadeEffect = setInterval(() => {
            if (!canvas.style.opacity) {
                canvas.style.opacity = 1;
            }
            if (canvas.style.opacity > 0) {
                canvas.style.opacity -= 0.05; // Adjust the speed of fading
            } else {
                clearInterval(fadeEffect);
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            }
        }, 50);
    }, 4000); // Stop confetti after 4 seconds
}


function updateProgress(totalDrank = 0) {
    const goal = parseInt(document.getElementById('goal-input').value); // Get the current goal
    const progressBar = document.getElementById('progress-bar');
    const waterLevel = document.querySelector('.water-level');
    const celebrateSound = document.getElementById('celebrate-sound');

    progressBar.value = totalDrank;
    progressBar.max = goal;

    // Calculate percentage of the goal achieved
    const percentage = (totalDrank / goal) * 100;

    // Update the height of the water level in the bottle
    waterLevel.style.height = `${percentage}%`;

    // Play celebration sound and confetti if the goal is met
    if (totalDrank >= goal) {
        celebrateSound.play();
        startConfetti();
    }
}

function resetApp() {
    document.getElementById('goal-input').value = 2000;
    document.getElementById('total-drank').textContent = "0 ml";
    document.getElementById('progress-bar').value = 0;
    document.querySelector('.water-level').style.height = "0%";
}
