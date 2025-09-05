const menuBtn = document.querySelector(".menu-btn");
    container = document.querySelector(".container");

    const progressBar = document.querySelector(".bar"),
        progressDot = document.querySelector(".dot"),
        currentTimeEl = document.querySelector(".current-time"),
        DurationEl = document.querySelector(".duration");

menuBtn.addEventListener("click", () => {
    container.classList.toggle("active");
});

let playing = false;
    currentSong = 0,
    shuffle = false,
    repeat = false,
    favourits = [],
    audio = new Audio();


const songs = [
    {
        title:"Creditos",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546424/Creditos_qfsijn.wav",
    },
    {
        title:"Emilio's theme",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546835/Emilio_s_theme_vezsfc.wav",
    },
    {
        title:"Es ella",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546842/Es_ella..._hnlbqv.wav",
    },
    {
        title:"Hagas lo que hagas",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546846/Hagas_lo_que_hagas..._pqtiga.wav",
    },
    {
        title:"Las cosas que miras cambian",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546844/Las_cosas_que_miras_cambian_keasdj.wav",
    },
    {
        title:"Pika Pika",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546831/Pika_Pika_fpyp9a.wav",
    },
    {
        title:"Tema de Amor y Eva",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756546849/Tema_de_Amor_y_Eva_vieopv.wav",
    },
    
];

const playlistContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector("#current-favourite");

function init() {
    updatePlaylist(songs);
    loadSong(currentSong);
}

init();


function updatePlaylist(songs) {

    //remove any existing element

    playlistContainer.innerHTML = "";

    //use for each on songs array

    songs.forEach((song, index) => {

        //extract data from song

        const {title, src} = song

        const isFavourite = favourits.includes(index);

        // create a tr to wrappe song

        const tr = document.createElement("tr");
        tr.classList.add("song");
        tr.innerHTML = `
        <td class="no">
                <h4>${index + 1}</h4>
            </td>
            <td class="title">
                <h5>${title}</h5>
            </td>
            <td class="length">
                <h4>2:03</h4>
            </td>
            <td>
             <i class="fas fa-heart ${ isFavourite ? "active" : ""}"></i>
            </td>
    `;

        playlistContainer.appendChild(tr);

            //play song when selected from the playilist

            tr.addEventListener("click", (e) => {

                //add to favourits when clicked on heart

                if(e.target.classList.contains("fa-heart")) {
                    addToFavourits(index);
                    e.target.classList.toggle("active");
                    //if heart clicked just add to favourits dont play
                    return;
                }

                currentSong = index;
                loadSong(currentSong);
                audio.play();
                container.classList.remove("active");
                playPauseBtn.classList.replace("fa-play", "fa-pause");
                playing = true;
            })


        const audioForDuration = new Audio(src);
        audioForDuration.addEventListener("loadeddata", () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h4").innerText = songDuration;
        });
    });
}

function formatTime(time) {
    // Format time like 2:30
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    
    // Add trailing zero if seconds less than 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${minutes}:${seconds}`;
}

function loadSong(num) {
    infoWrapper.innerHTML = `
        <h2>${songs[num].title}</h2>
            <h3>${songs[num].artist}</h3>
    `;

    currentSongTitle.innerHTML = songs[num].title;

    coverImage.style.backgroundImage = `url("${songs[num].img_src}")`;

    //add src of current song to audio variable

    audio.src = songs[num].src;
   
    //if song is in favourite highlight

    if (favourits.includes(num)) {
        currentFavourite.classList.add("active");
    }
    else {
        currentFavourite.classList.remove("active");
    }
}

//play pause next prev functionality

const playPauseBtn = document.querySelector("#playpause"),
    nextBtn = document.querySelector("#next"),
    prevBtn = document.querySelector("#prev");


playPauseBtn.addEventListener("click", () => {
    if (playing) {
        //pause if already playing
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
        audio.pause();
    } else {
        //if not playing play
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing = true;
        audio.play();
    }
});


function nextSong() {
    //shuffle when playing next song

    if (shuffle) {
        shuffleFunc();
        loadSong(currentSong);
        if (playing) audio.play();
        return;
    }


    //is current song is not the last in the playlist
    else if (currentSong < songs.length - 1) {
        currentSong++;
        
    } else {
        //else if its the last song, go to the first
        currentSong = 0;
    }
    loadSong(currentSong);
    //after load if song was playing keep playing current too

    if (playing) {
        audio.play();
    }
}

nextBtn.addEventListener("click", nextSong);


function prevSong() {

    if (shuffle) {
        shuffleFunc();
        loadSong(currentSong);
        if (playing) audio.play();
        return;
    }

    //is current song is not the first go to last
    else if (currentSong > 0) {
        currentSong--;
        
    } else {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    //after load if song was playing keep playing current too

    if (playing) {
        audio.play();
    }
}

prevBtn.addEventListener("click", prevSong);

function addToFavourits(index) {
    // Check if already in favourites, then remove
    if (favourits.includes(index)) {
        favourits = favourits.filter(item => item !== index);
        //if current song is removed also remove currentFavourit
        currentFavourite.classList.remove("active");
    } else {
        // If not already in favourites, add it
        favourits.push(index);
        //if coming from current favourit that is index and current are equals

        if (index == currentSong) {
            currentFavourite.classList.add("active");
        }
    }

    //after adding Favourite rerender playlist to show favourits

    updatePlaylist(songs);
}


//also add to favourit current playing song when clicked heart

currentFavourite.addEventListener("click", () => {
    currentFavourite.classList.toggle("active");
    addToFavourits(currentSong);
    
});


//add shuffle functionality

const shuffleBtn = document.querySelector("#shuffle");

function shuffleSongs() {
    //if shuffle false make it true or vice versa
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("active");
}

shuffleBtn.addEventListener("click", shuffleSongs);

//if shuffle true songs when playing next or prev

function shuffleFunc() {
    if (shuffle) {
        // select a different random song (avoid repeating the same one)
        let next;
        do {
            next = Math.floor(Math.random() * songs.length);
        } while (next === currentSong && songs.length > 1);
        currentSong = next;
    }
}


//repeat functionality

const repeatBtn = document.querySelector("#repeat");

function repeatSong() {
    if (repeat == 0) {
        repeat = 1;
        repeatBtn.classList.add("active");
    } else if (repeat == 1) {
        repeat = 2;
        repeatBtn.classList.add("active");
    } else {
        repeat = 0;
        repeatBtn.classList.remove("active");
    }
}

repeatBtn.addEventListener("click", repeatSong);


audio.addEventListener("ended", () => {
    if (repeat == 1) {
        loadSong(currentSong);
        audio.play();
    } else if (repeat == 2) {
    nextSong();
    audio.play();
    } else {
        if (currentSong == songs.length - 1) {
        audio.pause();
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
    }
    }
});


//progress bar

//progress function

function progress() {
    let { duration, currentTime } = audio;

    duration = isNaN(duration) ? 0 : duration;
    currentTime = isNaN(currentTime) ? 0 : currentTime;

    currentTimeEl.innerHTML = formatTime(currentTime);
    DurationEl.innerHTML = formatTime(duration); // fixed this typo

    if (!isDragging) {
        let percent = currentTime / duration;
        updateDotPosition(percent);
    }
}

//update progress on audio timeupdate event

audio.addEventListener("timeupdate", progress);


//change progress when clicked on bar

function setProgress(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener("click", setProgress);

let isDragging = false;

function setProgressFromX(x) {
    const rect = progressBar.getBoundingClientRect();
    let offsetX = x - rect.left;

    // clamp value between 0 and bar width
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    const percent = offsetX / rect.width;
    audio.currentTime = percent * audio.duration;
    updateDotPosition(percent);
}

function updateDotPosition(percent) {
    progressDot.style.left = `${percent * 100}%`;
}

// Mouse drag events
progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    setProgressFromX(e.clientX);
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        setProgressFromX(e.clientX);
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Optional: Touch support
progressBar.addEventListener("touchstart", (e) => {
    isDragging = true;
    setProgressFromX(e.touches[0].clientX);
});

document.addEventListener("touchmove", (e) => {
    if (isDragging) {
        setProgressFromX(e.touches[0].clientX);
    }
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

const searchWrapper = document.querySelector(".search-wrapper");
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

// Toggle input field when icon is clicked
searchIcon.addEventListener("click", () => {
    searchWrapper.classList.toggle("expanded");

    if (searchWrapper.classList.contains("expanded")) {
        searchInput.focus();
    } else {
        searchInput.value = "";
        updatePlaylist(songs); // reset to full list
    }
});

// Search on Enter
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();
        const filteredSongs = songs.filter(song =>
            song.title.toLowerCase().includes(query)
        );
        updatePlaylist(filteredSongs);
    }
});

