var audio = document.getElementById("song");
var playbtn = document.getElementById("playpause");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var progressbar = document.getElementById("progressbar");
var songImage = document.getElementById("song-img");
var artistName = document.getElementById("song-artist");
var songTitle = document.getElementById("song-title");
var playpauseicon = document.querySelector("#playpause i");
var thumb = document.getElementById("thumb");
var slider = document.getElementById("range-slider");
var startTime = document.getElementById("start-time");
var totalTime = document.getElementById("total-time");

let songPlaying = false;
let songId = 0;

const Images = [
    "gulimata-song.jpg",
    "isq-ka-raja.jpg",
    "kalaastar-yoyo-honey-singh.jpg",
    "kalank-by-arjit-singh.jpg",
    "rihaayi hustle 2.0.jpg"
];

const Songs = [
    "Gulimata.mp3",
    "ishq_ka_raja.mp3",
    "Kalaastar.mp3",
    "kalank.mp3",
    "rihaayi_by_paradox.mp3"
];

const Artists = [
    "Saad Lamjarred",
    "Addy Nagar",
    "Yo Yo Honey Singh",
    "Arijit Singh",
    "Paradox"
];

const Titles = [
    "Gulimata Arabic Song",
    "Ishq Ka Raja",
    "Kalaastar By Honey Singh",
    "Kalank",
    "Rihaayi"
];

// Load song data
function loadSongData() {
    audio.src = "./img/" + Songs[songId];
    songImage.src = "./img/" + Images[songId];
    songTitle.innerText = Titles[songId];
    artistName.innerText = Artists[songId];

    audio.addEventListener('loadedmetadata', () => {
        totalTime.innerText = formatTime(audio.duration);
    });
}

// Format time in mm:ss
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;
    return `${minutes}:${seconds}`;
}

// Play / Pause
playbtn.addEventListener('click', () => {
    if (songPlaying) {
        audio.pause();
        songPlaying = false;
        playpauseicon.classList.remove("fa-pause");
        playpauseicon.classList.add("fa-play");
        songImage.classList.remove("spin-img");
    } else {
        audio.play();
        songPlaying = true;
        playpauseicon.classList.remove("fa-play");
        playpauseicon.classList.add("fa-pause");
        songImage.classList.add("spin-img");
    }
});

// Next
nextBtn.addEventListener('click', () => {
    songId++;
    if (songId > Songs.length - 1) songId = 0;
    loadSongData();
    if (songPlaying) audio.play();
});

// Previous
prevBtn.addEventListener('click', () => {
    songId--;
    if (songId < 0) songId = Songs.length - 1;
    loadSongData();
    if (songPlaying) audio.play();
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    let currentAudioTime = audio.currentTime;
    startTime.innerText = formatTime(currentAudioTime);

    let currentTimePercent = (currentAudioTime / audio.duration) * 100 + "%";
    thumb.style.left = currentTimePercent;
    slider.style.width = currentTimePercent;
});

// Seek function
function setTime(output, input) {
    var newTime = (input / 100) * audio.duration;
    audio.currentTime = newTime;
    output.style.left = input + "%";
    slider.style.width = input + "%";
}

// Slider click / drag
slider.parentElement.addEventListener('click', function (e) {
    var rect = this.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var totalWidth = rect.width;
    var percent = (offsetX / totalWidth) * 100;
    setTime(thumb, percent);
});

// Initial load
loadSongData();
