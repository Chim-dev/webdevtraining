const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEL = document.getElementById('current-time'),
durationEL = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
playBtn = document.getElementById('play'),
nextBtn = document.getElementById('next'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'Assets/MaryPuppet.mp3',
        displayName: 'Puppet: Mary\'s Theme (Ib) Vocal Cover by Lizz Robinett',
        cover: 'Assets/813836.jpg',
        artist: 'Lizz Robinett',
    },
    {
        path: 'Assets/Myosotis.mp3',
        displayName: 'M2U - Myosotis',
        cover: 'Assets/myosotis.png',
        artist: 'M2U',
    },
    {
        path: 'Assets/marigold.mp3',
        displayName: 'M2U - Marigold',
        cover: 'Assets/marigold.jpg',
        artist: 'M2U',
    },
    {
        path: 'Assets/Rose.mp3',
        displayName: '[Rose Panna] Catharsis',
        cover: 'Assets/Rose.jpg',
        artist: 'Rose Panna',
    },
    {
        path: 'Assets/Ellin.mp3',
        displayName: '[Ellin] 果てなき旅',
        cover: 'Assets/Ellin.jpg',
        artist: 'Ellin',
    },
    {
        path: 'Assets/kienai.mp3',
        displayName: '消えない欠片',
        cover: 'Assets/kienai.jpg',
        artist: '霜月はるかのしもつきんチャンネル',
    }
]

let musicIndex = 0;
let isPlaying = false;

function togglePLay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('tittle','pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('tittle','play');
    music.pause();
}

function loadMusic(songs){
    music.src = songs.path;
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    image.src = songs.cover;
    background.src = songs.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');

}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEL.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEL.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click',togglePLay);
prevBtn.addEventListener('click',() => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate' , updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);