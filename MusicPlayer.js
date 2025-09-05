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
        title:"Detras del cuadro - Short Film (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756547511/1_y0pedk.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756662917/Detras_del_cuadro_vbb9my.wav",
    },
    {
        title:"PULSO - El amande (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545790/Pulso_-_Photo_5_fomt5k.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756662959/PULSO_-_El_amande_hserui.wav",
    },
    {
        title:"PULSO - Las Pastillias (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545790/Pulso_-_Photo_5_fomt5k.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663003/PULSO_-_Las_Pastillias_gy7mpr.wav",
    },
    {
        title:"PULSO - Presión (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545790/Pulso_-_Photo_5_fomt5k.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663065/PULSO_-_Presi%C3%B3n_o7jlcu.wav",
    },
    {
        title:"Abandoned Countryside (Εγκαταλελειμμένη Ύπαιθρος) (2021)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545795/Abandoned_countryhouse_-_Photo_6_vicbeq.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663144/Abandoned_Countryside_%CE%95%CE%B3%CE%BA%CE%B1%CF%84%CE%B1%CE%BB%CE%B5%CE%BB%CE%B5%CE%B9%CE%BC%CE%BC%CE%AD%CE%BD%CE%B7_%CE%8E%CF%80%CE%B1%CE%B9%CE%B8%CF%81%CE%BF%CF%82_2021_n45wi6.wav",
    },
    {
        title:"CAPTCHA - Just a game... (2020)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756547884/4_nbheh2.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663326/just-a-game-2020_q4vgjh.flac",
    },
    {
        title:"CAPTCHA - Pain  (2020)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756547884/4_nbheh2.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663410/CAPTCHA_-_Pain_2020_cvpaav.wav",
    },
    {
        title:"The Feeling before Jumping (2022)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756548010/5_xdjfjn.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663493/The_Feeling_before_Jumping_2022_wh2f6l.wav",
    },
    {
        title:"Flame through Water (2022)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756548118/6_n50nmb.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663581/Flame_through_Water_2022_ocfwik.wav",
    },
    {
        title:"More than the sum of its parts (2022)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545789/More_than_the_sum_of_its_parts_-_Photo_3_svpubj.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756663890/More_than_the_sum_of_its_parts_2022_niuwqw.mp3",
    },
    {
        title:"Desert night Sky (2023)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545789/Desert_night_sky_-_Photo_7_xh6pwo.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756664182/Desert_night_Sky_2023_cth1an.mp3",
    },
    {
        title:"El joven Capitan de la Sirena (2023)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756579074/9_syum4t.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756826258/El_joven_Capitan_de_la_Sirena_2023_ab5cz2.mp3",
    },
    {
        title:"La Chica del Bosque (2022)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545793/Mp3player_qg62x5.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756826489/La_Chica_del_Bosque_2022_y1oild.mp3",
    },
    {
        title:"For Emily (2022)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545793/Mp3player_qg62x5.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756826573/For_Emily_2022_xnpcvn.flac",
    },
    {
        title:"Gestures - EUROMUSE, Prehistoric art museum of Maçao (2025)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756579456/11_zzcjaq.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756827171/Gestures_-_EUROMUSE_Prehistoric_art_museum_of_Ma%C3%A7ao_2025_lfs1je.mp3",
    },
    {
        title:"Thira (Θήρα) (2021)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756629403/12_nzd28w.png",
        src: "https://res.cloudinary.com/dekc5arwj/video/upload/v1756827598/Thira_%CE%98%CE%AE%CF%81%CE%B1_2021_bp9uxn.flac",
    },
    {
        //start here//
        title:"Light (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756633664/13_ch0nbv.png",
        src: "Light (2024).wav",
    },
    {
        title:"Myst (2018)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545793/Mp3player_qg62x5.png",
        src: "Myst (2018).wav",
    },
    {
        title:"Another Home (2017)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545793/Mp3player_qg62x5.png",
        src: "Another Home (2017).wav",
    },
    {
        title:"Enigma's Path I (2024)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545791/Enigma_s_Path_I_-_Photo_10_fj2yf6.jpg",
        src: "Enigma's Path I (2024).wav",
    },
    {
        title:"Αλλά τωρά; (But now?) (2021)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662437/15_pmeapu.png",
        src: "Αλλά τωρά; (But now?) (2021).wav",
    },
    {
        title:"In the Red House (2020)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756545793/Mp3player_qg62x5.png",
        src: "In the Red House (2020).wav",
    },
    {
        title:"The Day of the Bee (2020)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662485/16_mvhkmv.png",
        src: "The Day of the Bee (2020).wav",
    },
    {
        title:"To Dogma (2020)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662485/16_mvhkmv.png",
        src: "To Dogma (2020).wav",
    },
    {
        title:"The Ritual (2019)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662485/16_mvhkmv.png",
        src: "The Ritual (2019).wav",
    },
    {
        title:"Analog Madness (2019)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662485/16_mvhkmv.png",
        src: "Analog Madness (2019).wav",
    },
    {
        title:"The Beast by the Sea (2018)",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756662485/16_mvhkmv.png",
        src: "The Beast by the Sea (2018).wav",
    },
    {
        title:"Historia entre Lineas - Creditos",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Creditos.wav",
    },
    {
        title:"Historia entre Lineas - Emilio's theme",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Emilio's theme.wav",
    },
    {
        title:"Historia entre Lineas - Es ella",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Es ella.wav",
    },
    {
        title:"Historia entre Lineas - Hagas lo que hagas",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Hagas lo que hagas.wav",
    },
    {
        title:"Historia entre Lineas - Las cosas que miras cambian",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Las cosas que miras cambian.wav",
    },
    {
        title:"Historia entre Lineas - Pika Pika",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Pika Pika.wav",
    },
    {
        title:"Historia entre Lineas - Tema de Amor y Eva",
        artist: "Rafaelos Christofi",
        img_src: "https://res.cloudinary.com/dekc5arwj/image/upload/v1756546290/1_rbalgz.jpg",
        src: "Tema de Amor y Eva.wav",
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
    } else if (repat == 2) {
        nextSong();
        audio.play();
    } else {
        if (currentSong == songs.length - 1) {
            auio.pause();
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            playing = false;
        } else{
            nextSong();
            audio.play();
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

// Add click functionality for external accordion song titles
document.addEventListener("DOMContentLoaded", function () {
    const externalTitles = document.querySelectorAll(".song-title");

    externalTitles.forEach(title => {
        title.addEventListener("click", function () {
            const index = parseInt(this.dataset.songIndex);

            if (!isNaN(index)) {
                currentSong = index;
                loadSong(currentSong);
                audio.play();
                playPauseBtn.classList.replace("fa-play", "fa-pause");
                playing = true;
            } else {
                console.warn("Invalid song index:", this.dataset.songIndex);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const accordionItems = document.querySelectorAll(".accordion li");

    accordionItems.forEach(item => {
        const input = item.querySelector('input[type="radio"]');
        const content = item.querySelector('.content');

        input.addEventListener('change', () => {
            // Collapse all
            document.querySelectorAll('.accordion .content').forEach(c => {
                c.style.height = '0';
                c.style.paddingBottom = '0';
            });

            // Expand selected
            if (input.checked) {
                const scrollHeight = content.scrollHeight;
                content.style.height = scrollHeight + "px";
                content.style.paddingBottom = '20px';
            }
        });

        // Trigger animation on page load for checked one
        if (input.checked) {
            const scrollHeight = content.scrollHeight;
            content.style.height = scrollHeight + "px";
            content.style.paddingBottom = '20px';
        }
    });
});
