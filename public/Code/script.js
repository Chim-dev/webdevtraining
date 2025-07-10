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
        cover: 'Assets/myosotis.jpg',
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

const volumeIcon = document.getElementById('volume-icon');
const volumeSlider = document.getElementById('volume-slider');
let volumeTimer;

// Tampilkan / sembunyikan slider volume saat klik ikon
volumeIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // supaya klik di icon tidak trigger document click
  const isVisible = volumeSlider.classList.contains('active');

  if (!isVisible) {
    volumeSlider.classList.add('active');
    
    // Auto-hide setelah 3 detik
    clearTimeout(volumeTimer);
    volumeTimer = setTimeout(() => {
      volumeSlider.classList.remove('active');
    }, 3000);
  } else {
    volumeSlider.classList.remove('active');
    clearTimeout(volumeTimer);
  }
});

// Menyembunyikan slider saat klik di luar area slider dan icon
document.addEventListener('click', (e) => {
  if (!volumeSlider.contains(e.target) && e.target !== volumeIcon) {
    volumeSlider.classList.remove('active');
    clearTimeout(volumeTimer);
  }
});

// Mengatur volume saat slider digeser
volumeSlider.addEventListener('input', (e) => {
  music.volume = e.target.value;
});

const menuBtn = document.getElementById('menu-btn');
const playlistSidebar = document.getElementById('playlist-sidebar');

// Toggle sidebar saat klik tombol list
menuBtn.addEventListener('click', () => {
  playlistSidebar.classList.toggle('show');
});

// Load lagu saat item diklik
document.querySelectorAll('#playlist-sidebar ul li').forEach((item, index) => {
  item.addEventListener('click', () => {
    loadMusic(index); // pastikan kamu punya fungsi ini
    playlistSidebar.classList.remove('show'); // tutup sidebar
  });
});

volumeSlider.addEventListener('input', (e) => {
  const volume = parseFloat(e.target.value);

  if (volume === 0) {
    volumeIcon.className = 'fa-solid fa-volume-xmark'; // 🔇
  } else if (volume > 0 && volume <= 0.5) {
    volumeIcon.className = 'fa-solid fa-volume-low'; // 🔉
  } else {
    volumeIcon.className = 'fa-solid fa-volume-high'; // 🔊
  }

  // Atur volume audio
  if (music) {
    music.volume = volume;
  }
});

const musicList = document.getElementById('music-list');
const container = document.querySelector('.container');
const musicItems = document.getElementById('music-items');



function renderSongList() {
  musicItems.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.displayName} - ${song.artist}`;
    li.addEventListener('click', () => {
      musicIndex = index;               // Set lagu yang dipilih
      loadMusic(songs[musicIndex]);     // Load lagu berdasarkan index
      playMusic();                      // Mainkan lagu
      musicList.classList.remove('active');
      container.classList.remove('shifted');
    });
    musicItems.appendChild(li);
  });
}



function loadSong(index) {
  const song = songs[index];
  music.src = song.file;
  cover.src = song.cover;
  document.getElementById('music-title').textContent = `${song.title}`;
  document.getElementById('music-artist').textContent = `${song.artist}`;
  music.play();
}

// Toggle panel
menuBtn.addEventListener('click', () => {
  musicList.classList.toggle('active');
  container.classList.toggle('shifted');
});

// Panggil awal
renderSongList();

const addBtn = document.getElementById('add-song-btn');
const addForm = document.getElementById('add-song-form');

addBtn.addEventListener('click', () => {
  if (addForm.classList.contains('hidden')) {
    addForm.classList.remove('hidden');
    addBtn.textContent = 'Tutup Form';
  } else {
    addForm.classList.add('hidden');
    addBtn.textContent = '+ Tambah Lagu';
  }
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('song-title').value;
  const artist = document.getElementById('song-artist').value;
  const audioFile = document.getElementById('song-audio').files[0];
  const coverFile = document.getElementById('song-cover').files[0];

  if (title && artist && audioFile && coverFile) {
    const readerAudio = new FileReader();
    const readerCover = new FileReader();

    readerAudio.onload = (eAudio) => {
      readerCover.onload = (eCover) => {
        songs.push({
          displayName: title,
          artist: artist,
          path: eAudio.target.result,
          cover: eCover.target.result
        });

        renderSongList();
        addForm.reset();
        addForm.classList.add('hidden');
        addBtn.textContent = '+ Tambah Lagu';
      };
      readerCover.readAsDataURL(coverFile);
    };

    readerAudio.readAsDataURL(audioFile);
  } else {
    alert("Mohon lengkapi semua field.");
  }
});
