var audio=document.getElementById("song");
var playbtn=document.getElementById("playpause");
var prevBtn=document.getElementById("prev");
var nextBtn=document.getElementById("next");
var progressbar=document.getElementById("progressbar");
var songImage=document.getElementById("song-img");
var artistName=document.getElementById("song-artist");
var songTitle=document.getElementById("song-title");
var playpauseicon=document.querySelector("#playpause i");
var thumb=document.getElementById("thumb");
var slider=document.getElementById("range-slider");
var startTime=document.getElementById("start-time");
var totalTime=document.getElementById("total-time");


let songPlaying=false;
let songId=0;

const Images=["gulimata-song.jpg",
            "isq-ka-raja.jpg",
            "kalaastar-yoyo-honey-singh.jpg",
            "kalank-by-arjit-singh.jpg",
            "Rihaayi Hustle 2.0.jpg"
            ];

const Songs=["Gulimata.mp3",
            "ishq_ka_raja.mp3",
            "Kalaastar.mp3",
            "kalank.mp3",
            "rihaayi_by_paradox.mp3"
            ];

const Artists=["Saad Lamjarred",
            "Addy Nagar",
            "Yo Yo Honey Singh",
            "Arijit Singh",
            "Paradox"
            ];

const Titles=["Gulimata Arabic Song",
            "Ishq Ka Raja",
            "Kalaastar By Honey Singh",
            "Kalank",
            "Rihaayi"
            ];

// Function for playing the song
playbtn.addEventListener('click',()=>{
//    songPlaying?audio.pause():audio.play();
if(songPlaying){
    audio.pause();
    songPlaying=false;
    playpauseicon.classList.remove("fa-pause");
    playpauseicon.classList.add("fa-play");
    songImage.classList.remove("spin-img");
}
else{
    audio.play();
    songPlaying=true;
    playpauseicon.classList.remove("fa-play");
    playpauseicon.classList.add("fa-pause");
    songImage.classList.add("spin-img");
}
})

function loadSongData()
{
   audio.src="img/"+Songs[songId];
   songImage.src="img/"+Images[songId];
   songTitle.innerText=Titles[songId];
   artistName.innerText=Artists[songId];
}
loadSongData();

//next Button Function
nextBtn.addEventListener('click',()=>{
    songId++;
    if(songId>Songs.length-1)
    {
        songId=0;
    }
    loadSongData();
    switchSong()
});

//prev Button Function
prevBtn.addEventListener('click',()=>{
    songId--;
    if(songId<0)
    {
        songId=Songs.length-1;
    }
    loadSongData();
    switchSong();
});

//switch song
function  switchSong(){
    if(songPlaying==true)
    {
        audio.play()
    }
}

audio.addEventListener('timeupdate',()=>{
    var currentAudioTime = Math.floor(audio.currentTime);
    var currentTimePercent =(currentAudioTime/audio.duration)*100+"%";
    thumb.style.left=currentTimePercent;
    slider.style.width=currentTimePercent;
})


function setTime(output,input){
    
}
// Allow user to set the song's playback time using the slider
function setTime(output, input) {
    // input me percentage milega (0-100)
    var newTime = (input / 100) * audio.duration; // convert % to seconds
    audio.currentTime = newTime;
    output.style.left = input + "%";
    slider.style.width = input + "%";
}

// Slider click or drag functionality
slider.parentElement.addEventListener('click', function(e){
    // slider ka relative click position
    var rect = this.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var totalWidth = rect.width;
    var percent = (offsetX / totalWidth) * 100;
    setTime(thumb, percent);
});
