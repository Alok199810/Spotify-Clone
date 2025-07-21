console.log("Welcome to Spotify");

// Initial setup
let songindex = 0;
let audioElement = new Audio('song/1.mp3');
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let mastersongname = document.getElementById("mastersongname");
let songitems = Array.from(document.getElementsByClassName("songitem"));

// Song list array
let songs = [
    { songname: "kaho na kaho", filepath: "song/1.mp3", coverpath: "covers/cover1.jpg" },
    { songname: "Mitwa", filepath: "song/2.mp3", coverpath: "covers/2.jpg" },
    { songname: "Main shaiyar Toh", filepath: "song/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "Tujhe bhula diya", filepath: "song/4.mp3", coverpath: "covers/4.jpg" },
    { songname: "Saiyaara", filepath: "song/5.mp3", coverpath: "covers/5.jpg" },
];

// Dynamically update song items
songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

// Play/Pause button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        document.getElementById(songindex).classList.remove('fa-circle-play');
        document.getElementById(songindex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        document.getElementById(songindex).classList.remove('fa-circle-pause');
        document.getElementById(songindex).classList.add('fa-circle-play');
    }
});

// Time update and progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek in audio
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// Helper: reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Click on individual song
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songindex + 1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    audioElement.src = `song/${songindex + 1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-circle-play');
    document.getElementById(songindex).classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    audioElement.src = `song/${songindex + 1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-circle-play');
    document.getElementById(songindex).classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
});
