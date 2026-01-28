
const songs = [
    {
        title: "Dream Vibes",
        artist: "Alex",
        src: "song1.mp3",
        cover: "image1.jpeg"
    },
    {
        title: "Night Drive",
        artist: "Nova",
        src: "song2.mp3",
        cover: "image2.jpeg"
    },
    {
        title: "Chill Beats",
        artist: "Zen",
        src: "song3.mp3",
        cover: "image3.jpeg"
    }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");

function loadSong(index) {
    const song = songs[index];
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
    highlightSong();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    current.innerText = formatTime(audio.currentTime);
    duration.innerText = formatTime(audio.duration);
});

function formatTime(time) {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return min + ":" + sec;
}

function setProgress(e) {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(value) {
    audio.volume = value;
}

function highlightSong() {
    const items = document.querySelectorAll(".playlist div");
    items.forEach((item, i) => {
        item.classList.toggle("active", i === currentSong);
    });
}

songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.innerText = song.title + " - " + song.artist;
    div.onclick = () => {
        currentSong = index;
        loadSong(index);
        audio.play();
        isPlaying = true;
    };
    playlist.appendChild(div);
});

loadSong(currentSong);