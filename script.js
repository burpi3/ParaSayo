// Handle background music
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const restartBtn = document.getElementById('restartBtn');
const volumeSlider = document.getElementById('volumeSlider');
backgroundMusic.volume = 0.5; // Set initial volume to 50%

// Function to update play/pause button
function updatePlayPauseButton() {
  playPauseBtn.textContent = backgroundMusic.paused ? '▶' : '⏸';
}

// Function to play background music
async function playBackgroundMusic() {
  try {
    // Resume audio context if needed
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();
    
    // Play the music
    await backgroundMusic.play();
    updatePlayPauseButton();
    console.log('Background music started playing');
  } catch (error) {
    console.log('Auto-play failed:', error);
    // Add click event to start music if auto-play fails
    document.addEventListener('click', () => {
      backgroundMusic.play();
      updatePlayPauseButton();
    }, { once: true });
  }
}

// Play/Pause button click handler
playPauseBtn.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
  updatePlayPauseButton();
});

// Restart button click handler
restartBtn.addEventListener('click', () => {
  backgroundMusic.currentTime = 0;
  if (!backgroundMusic.paused) {
    backgroundMusic.play();
  }
});

// Volume slider handler
volumeSlider.addEventListener('input', (e) => {
  backgroundMusic.volume = e.target.value / 100;
});

// Update button when music ends
backgroundMusic.addEventListener('ended', updatePlayPauseButton);

// Try to play music when the page loads
document.addEventListener('DOMContentLoaded', playBackgroundMusic);
window.addEventListener('load', playBackgroundMusic);

// Also try to play when the page becomes visible
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    playBackgroundMusic();
  }
});

// Handle thought cloud animations
const buttons = {
  'top-left': 'cloud-top-left',
  'top-right': 'cloud-top-right',
  'middle-left': 'cloud-middle-left',
  'middle-right': 'cloud-middle-right',
  'bottom-left': 'cloud-bottom-left',
  'bottom-right': 'cloud-bottom-right'
};

// Keep track of the currently visible cloud
let currentVisibleCloud = null;

document.querySelectorAll('.heart-button').forEach(button => {
  button.addEventListener('click', () => {
    // Get the position class from the button
    const position = button.className.split(' ')[1];
    const cloudId = buttons[position];
    
    if (cloudId) {
      const cloud = document.getElementById(cloudId);
      if (cloud) {
        // If clicking the same button, hide the cloud
        if (currentVisibleCloud === cloud) {
          cloud.classList.remove('show');
          currentVisibleCloud = null;
        } else {
          // Hide the previously visible cloud
          if (currentVisibleCloud) {
            currentVisibleCloud.classList.remove('show');
          }
          
          // Show the new cloud
          cloud.classList.add('show');
          currentVisibleCloud = cloud;
        }
      }
    }
  });
});

// Handle image audio playback
document.querySelectorAll('.item').forEach(item => {
  const audioId = item.dataset.audio.split('/').pop().replace('.mp3', '');
  const audio = document.getElementById(audioId);
  let isPlaying = false;

  item.addEventListener('click', () => {
    // Stop all other playing audio
    document.querySelectorAll('.item').forEach(otherItem => {
      if (otherItem !== item) {
        const otherAudioId = otherItem.dataset.audio.split('/').pop().replace('.mp3', '');
        const otherAudio = document.getElementById(otherAudioId);
        if (otherAudio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
        }
      }
    });

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
    } else {
      audio.play();
      isPlaying = true;
    }
  });
});
