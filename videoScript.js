const player = document.getElementById('video-Container');
const video = document.getElementById('video');
const seekBar = document.getElementById('time-range');
const videoCurrentTime = document.getElementById("current-time")
const videoDuration = document.getElementById("duration")
const videoDurationShow = document.getElementById("video-Duration")
const playPauseButton = document.getElementById("play-Button-Container")
const playIcon = document.getElementById("play-Icon")
const pauseIcon = document.getElementById("pause-Icon")
const muteUnmuteButton = document.getElementById("volume-Button-Container")
const volumeIcon = document.getElementById("volume-Icon")
const muteIcon = document.getElementById("mute-Icon")

var playing = false
var firstPlay = true
var muted = false
var fullScreen = false

var episodeOpened = true

function formatVideoDuration(seconds) {
    const hrs = Math.floor(seconds / 3600); // Calculate hours
    const mins = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes
    const secs = Math.floor(seconds % 60); // Calculate remaining seconds

    // Format the time as HH:MM:SS, removing hours if 0
    const formatted = 
        (hrs > 0 ? hrs + ":" : "") + 
        (hrs > 0 ? (mins < 10 ? "0" + mins : mins) : mins) + ":" + 
        (secs < 10 ? "0" + secs : secs);
    
    return formatted;
}

function formatDurationInMinutes(seconds) {
    const hrs = Math.floor(seconds / 3600); // Calculate hours
    const mins = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes

    if (hrs > 0) {
        return `${hrs}h ${mins}m`; // Format with hours and minutes if hours exist
    } else {
        return `${mins}m`; // Only minutes if the duration is less than 1 hour
    }
}

// Update the range input's value as the video plays
video.addEventListener('timeupdate', () => {
    seekBar.value = video.currentTime;
    videoCurrentTime.textContent = formatVideoDuration(video.currentTime)
    updateSeekBarBackground();
    if(video.currentTime != 0) {
        currentTimesLocal[currentEpisode - 1] = video.currentTime 
        localStorage.setItem("currentTimes", currentTimesLocal)
    }

    episodeTimeRanges.forEach((timeRange, index) => {
        if(currentTimesServer != null) {
            timeRange.dataset.currentTime = currentTimesServer[index]
            if(currentTimesServer[index] != 0) {
                timeRange.style.background = "linear-gradient(to right, #ff0000 " + ((currentTimesServer[index] / (timeRange.dataset.duration * 60)) * 100) + "%, #ff0000 " + ((currentTimesServer[index] / (timeRange.dataset.duration * 60)) * 100) + "%, #ddd 0%, #ddd 100%)"
                console.log()
            }
        } else {
            console.log("Unwatched")
        }
    });
});

// Allow the user to seek by changing the range input
seekBar.addEventListener('input', (e) => {
    video.currentTime = e.target.value;
    updateSeekBarBackground();
});

// Update the background trail of the range input
function updateSeekBarBackground() {
    const percentage = (seekBar.value / seekBar.max) * 100;
    seekBar.style.background = `linear-gradient(to right, #ff0000 ${percentage}%, #ddd ${percentage}%)`;
}

function playVideo() {
    video.play()
    playIcon.style.display = "none"
    pauseIcon.style.display = "flex"
    playing = true
    if(firstPlay) {
        video.muted = false
        video.volume = .5
        unmuteVideo()
        firstPlay = false
    }
}

function pauseVideo() {
    video.pause()
    playIcon.style.display = "flex"
    pauseIcon.style.display = "none"
    playing = false
}

function muteVideo() {
    video.muted = true
    volumeIcon.style.display = "none"
    muteIcon.style.display = "flex"
    muted = true
}

function unmuteVideo() {
    video.muted = false
    volumeIcon.style.display = "flex"
    muteIcon.style.display = "none"
    muted = false
}

// MAIN
playPauseButton.addEventListener("click", function() {
    if(!playing) {
        playVideo()
    } else {
        pauseVideo()
    }
})

muteUnmuteButton.addEventListener("click", function() {
    if(!muted) {
        muteVideo()
    } else {
        unmuteVideo()
    }
})


document.addEventListener('keydown', function(event) {
    if(episodeOpened) {
            
        if (event.code === 'Space') {
            event.preventDefault(); // This prevents the scroll behavior
            
            if(!playing) {
                playVideo()
            } else {
                pauseVideo()
            }
            
        } else if (event.key === 'm' || event.key === 'M') {
            event.preventDefault(); // This prevents the scroll behavior
            
            if(!muted) {
                muteVideo()
            } else {
                unmuteVideo()
            }
        } else if (event.key === 'f' || event.key === 'F') {
            if(!fullScreen) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) { // Firefox
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { // IE/Edge
                    video.msRequestFullscreen();
                }
                fullScreen = true
            } else {
                document.exitFullscreen();
                fullScreen = false
            }
        }
    }
});

const fullscreenBtn = document.getElementById('full-Screen-Button-Container');

fullscreenBtn.addEventListener('click', function() {
    // Check if the video is already in full screen
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
});

document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        console.log('Exited fullscreen mode');
    }
});

video.addEventListener('play', () => {
    playVideo()
});

video.addEventListener('pause', () => {
    pauseVideo()
});

video.addEventListener('volumechange', () => {
    if (video.muted) {
        muteVideo()
    } else {
        unmuteVideo()
    }
});