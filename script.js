document.addEventListener('DOMContentLoaded', () => {
    updateProgress(); // Initialize progress on load
});

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
    const goal = 2000; // Daily goal in ml
    const progressBar = document.getElementById('progress-bar');
    const waterLevel = document.querySelector('.water-level');
    
    progressBar.value = totalDrank;
    progressBar.max = goal;

    // Calculate percentage of the goal achieved
    const percentage = (totalDrank / goal) * 100;

    // Update the height of the water level in the bottle
    waterLevel.style.height = `${percentage}%`;

    // Change progress bar color progressively based on the percentage
    progressBar.style.backgroundColor = `rgba(79, 195, 247, ${percentage / 100})`;
}
