const songs = [
    {
        title: "Saiyaara",
        artist: "Ek Tha Tiger",
        cover: "saiyaara_cover.png",
        src: "https://res.cloudinary.com/dviccjg97/video/upload/v1777889599/Saiyaara_-_Saiyaara_128_kbps_tvbqng.mp3"
    },
    {
        title: "Raanjhanaa",
        artist: "A. R. Rahman",
        cover: "raanjhanaa_cover.png",
        src: "https://res.cloudinary.com/dviccjg97/video/upload/v1777889598/Raanjhanaa-Lyrical-Video-Dhanush-Sonam-Kapoor-A.-R.-Rahman-Jaswinder-Singh-Shiraz-Uppal-SonyMusicIndiaVEVO-1_jeanmv.mp3"
    }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio-element');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const volumeContainer = document.getElementById('volume-container');
const volumeBar = document.getElementById('volume-bar');

// Initialize
loadSong(songs[songIndex]);

function loadSong(song) {
    currentTitle.innerText = song.title;
    currentArtist.innerText = song.artist;
    currentCover.src = song.cover;
    audio.src = song.src;
}

function playSong(index) {
    if (index !== undefined && index !== songIndex) {
        songIndex = index;
        loadSong(songs[songIndex]);
    }
    
    isPlaying = true;
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    if (isNaN(duration)) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Format current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    if (!isNaN(duration)) {
        audio.currentTime = (clickX / width) * duration;
    }
}

function setDuration() {
    const duration = audio.duration;
    if (isNaN(duration)) return;
    
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    let volumeLevel = clickX / width;
    
    if (volumeLevel < 0) volumeLevel = 0;
    if (volumeLevel > 1) volumeLevel = 1;
    
    audio.volume = volumeLevel;
    volumeBar.style.width = `${volumeLevel * 100}%`;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', setDuration);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', setVolume);

// Set initial volume
audio.volume = 1;
volumeBar.style.width = '100%';
