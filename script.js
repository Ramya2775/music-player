// Get the audio player, seek bar, and timer elements
const audioPlayer = document.getElementById('audioPlayer');
const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('current-time');

// Play the audio
function playAudio() {
    audioPlayer.play();
    updateTimer(); // Start the timer when the audio starts playing
}

// Pause the audio
function pauseAudio() {
    audioPlayer.pause();
}

// Stop the audio and reset to the beginning
function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Reset audio to the start
    currentTimeDisplay.textContent = "00:00"; // Reset the timer display
    seekBar.value = 0; // Reset seek bar to 0
}

// Function to update the timer and seek bar
function updateTimer() {
    const interval = setInterval(() => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        if (!isNaN(duration)) {
            // Update the time on the page in mm:ss format
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);

            currentTimeDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);

            // Update the seek bar based on the current time
            seekBar.value = (currentTime / duration) * 100;
        }

        // Stop updating when audio ends
        if (audioPlayer.currentTime === audioPlayer.duration) {
            clearInterval(interval);
        }
    }, 1000); // Update every second
}

// Format the time to always show two digits (e.g., 05 instead of 5)
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Function to handle seeking through the audio when the user changes the seek bar
function seekAudio() {
    const seekTime = (seekBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime; // Set the audio player's current time to the seek position

    // Manually update the timer when seeking (dragging the seek bar)
    const minutes = Math.floor(seekTime / 60);
    const seconds = Math.floor(seekTime % 60);
    currentTimeDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);
}
