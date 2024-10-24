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

    // Play celebration sound if the goal is met
    if (totalDrank >= goal) {
        celebrateSound.play();
    }
}
