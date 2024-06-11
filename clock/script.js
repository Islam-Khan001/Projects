if (window.innerWidth <= 700) {
    alert("This website is not responsive to mobile. you better be opening it in your pc!");
}



let minSigs = document.getElementsByClassName('sig-min-struc')
let pSigs = document.getElementsByClassName('sig-struc-p');
let stopHand = document.getElementsByClassName('stop-hands')[0];
let stopSec = document.getElementsByClassName('stop-sec')[0];
let timeInside = document.getElementById('timer-inside');
let timerOption = document.getElementById('options-timer');
let playPauseOption = document.getElementById('options-play-pause');
let allOptions = document.getElementById('options-div');
let addFlagOption = document.getElementById('options-flag-time');
let clearFlagOption = document.getElementById('options-clear-flags');
let clockOption = document.getElementById('options-clock');

const digclock = document.getElementById('digclock');

let timerButton = document.getElementById('timer-button');
// let myClock = document.getElementById('clock');
const clock = document.getElementById('clock');

let ist = document.getElementById("ist");

let lapContainer = document.getElementById('lap-container');
let stopWatch = document.getElementById('stop-watch');
let stopWatchHand = document.getElementById('stop-hand');

stopWatch.style.display = 'none';
clockOption.addEventListener('click', clockOptionClicked);

function clockOptionClicked(){
    lapContainer.style.display = 'none';
    allOptions.style.display = 'none';
    stopWatch.style.display = 'none';

    // stopWatch.style.transform = 'translatex(40px)';
    // stopWatch.style.opacity = '0%';

    timerButton.style.display = "flex";
    clock.style.display = "flex";
    // myClock.style.transform = 'rotate(360deg)';
    clock.style.opacity = '100%';
    ist.style.display = "flex";
    digclock.style.display = "";
}

timerButton.addEventListener('click', timerButtonClicked);

function timerButtonClicked(){
    lapContainer.style.display = 'inline-block';
    allOptions.style.display = 'flex';
    stopWatch.style.display = 'flex';

    timerButton.style.display = "none";
    clock.style.display = "none";
    ist.style.display = "none";
    digclock.style.display = "none";
}

let isTimerRunning = false;
timerOption.addEventListener('click',startMyTimer);

let clearTimeInterval;
let myStopMin = 0;
let myStopSec = 0;
let myStopMilSec = 0;
let formatms = 0;

let m = 0;
let ms = 0;
let s = 0;
let stopHandRotate = 0;

function startMyTimer(){
    if(!isTimerRunning){
        isTimerRunning = true;
        timerOption.textContent = 'Reset'
        timerOption.style.backgroundColor = 'blue';

        // startMyTimer();
        clearTimeInterval = setInterval(timerUpdate,10);  
    } else {
        isTimerRunning = false;
        timerOption.textContent = 'Start'

        if(clearTimeInterval){
            clearInterval(clearTimeInterval);
        }

        m = 0;
        ms = 0;
        s = 0;        

        timeInside.textContent = `00:00.00`;
        stopHandRotate = 0;
        stopHand.style.transform = `rotate(${stopHandRotate}deg)`;

    }
}

function timerUpdate (){
    ms += 10
    
    if(ms == 1000){
        ms = 0;
        s+=1;
        stopHandRotate += 1;
        stopHand.style.transform = `rotate(${(stopHandRotate*6+6)}deg`;
    }

    if(s == 60){
        s = 0;
        m+=1;
    }

    myStopMin = m < 10 ? '0' + m : m;
    myStopSec = s < 10 ? '0' + s : s;
    formatms = ms/10
    myStopMilSec = formatms < 10 ? '0' + formatms : formatms;
    timeInside.textContent = `${myStopMin}:${myStopSec}.${myStopMilSec}`;
}


playPauseOption.addEventListener('click', () => {
    if(isTimerRunning){
        playPauseOption.textContent = 'Resume';
        if(clearTimeInterval){
            clearInterval(clearTimeInterval);
            isTimerRunning = false;
        }
    } else {
        startMyTimer();
        isTimerRunning =true;
        playPauseOption.textContent = 'Pause'
        // clearTimeInterval;
    }    
});


addFlagOption.addEventListener('click', addFlags);

function addFlags(){
    if(isTimerRunning){
        let flagDiv = document.createElement('div');
        flagDiv.className = 'laps';
        flagDiv.textContent = `${myStopMin} : ${myStopSec} : ${myStopMilSec}`;
        lapContainer.appendChild(flagDiv);
        console.log("child appended");
    }
}

clearFlagOption.addEventListener('click', clearFlags);

function clearFlags(){
        const removeflags = document.querySelectorAll('div.laps');
  
        if(removeflags.length > 0){
            removeflags.forEach(div => {
                div.remove();
            });            
        }   
}

let minRotate = 90;
for (let minSig of minSigs){
    minSig.style.transform = `rotate(${minRotate}deg)`;
    minRotate += 6;
}

let pRotate = 90;
for (let pSig of pSigs){
    pSig.style.transform = `rotate(${pRotate}deg)`;
    pRotate += 30;
}

let timerAlreadyStarted = false;
let tSecs;
let currentTime = new Date();

let currenthour = currentTime.getHours();
const currentmin = currentTime.getMinutes();
const currentsec = currentTime.getSeconds();
const currentmon = currentTime.getMonth();
const currentday = currentTime.getDay();
const currentdate = currentTime.getDate();

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sept", "Oct", "Nov", "Dec"
];

const days = [
    "Sun", "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat"
];

let mon = months[currentmon];
let day = days[currentday];

let indian = document.getElementById("indian");
indian.textContent += ` ${day}, ${currentdate} ${mon}`;
let isam = true;
let mer = document.getElementById("mer");

const timehr = document.getElementById("timehr");
function digtimehr() {
    const currentTime = new Date();
    let ch =  currentTime.getHours();
    if(ch >=13){
        ch = ch%12;
    }
    if(ch == 0){
        ch = 12;
    }
    if(ch >=13 || ch == 0){
        isam = false;

    }
    return String(ch).padStart(2, '0');
}
setInterval(function () {
    const currentHour = digtimehr();
    timehr.textContent = currentHour + ":";
}, 1000);

let ch =  currentTime.getHours();

if(ch >=13 || ch == 0){
    isam = false;
}

if(isam == true){
    mer.textContent = "AM";
}
else{
    mer.textContent = "PM";
}

const timemn = document.getElementById("timemn")
function digtimemr(){
    const currentmn = new Date();
    const cm =  currentmn.getMinutes();
    return String(cm).padStart(2, '0');
} 
setInterval(function(){
    const cmn = digtimemr();
    timemn.textContent = cmn + ':';
},1000);

const timesc = document.getElementById("timesc");
function digtimesc(){
    const currentsc = new Date();
    const cs = currentsc.getSeconds();
    return String(cs).padStart(2, '0');
}
setInterval(function(){
    const csc = digtimesc();
    timesc.textContent = csc;
},1000);

let sectime = document.getElementsByClassName("sec-hand")[0];
let mintime = document.getElementsByClassName("min-hand")[0];
let hourtime = document.getElementsByClassName("hour-hand")[0];
let srotation = 0;

function upsec(){
    let currentTime = new Date();
    const currentsec = currentTime.getSeconds();

    srotation=(currentsec+1)*6;
    sectime.style.transform = `rotate(${srotation}deg)`;
}
setInterval(upsec,1000);


let mrotation=currentmin*6;

function upmin(){
    
    mrotation+=.1;
    // console.log(mrotation)
     
    mintime.style.transform = `rotate(${mrotation}deg)`;
}
setInterval(upmin,1000);


if(currenthour >= 13){
   currenthour = currenthour - 12;    
}

let hrotation=(currenthour*30) + (currentmin/2);

function uphour(){
    
    hrotation+=0.00833;
    console.log(hrotation)
    hourtime.style.transform = `rotate(${hrotation}deg)`;
}
setInterval(uphour,1000);

const clev = document.getElementById("container");

clev.addEventListener('click',function(event){

    if(!allOptions.contains(event.target) && (stopWatch.style.display == 'none')){
        // console.log("Inside on container");
        
        if(clock.style.display == `none`){
            
            let ddopac = 80;
            digclock.style.opacity = "100%"
            
            let dc = setInterval(() =>{
            digclock.style.opacity = `${ddopac}%`;
            ddopac -= 1;
            console.log("ddopac " + ddopac);
            if(ddopac < 0){
                clearInterval(dc);
                digclock.style.display = `none`;
                clock.style.display = `flex`;
                let opac = 0;

                let t = setInterval(() => {
                    clock.style.opacity = `${opac}%`;
                    opac+=1;
                    if(opac>100){
                        clearInterval(t);
                    }
                    
                }, .1);
            }
        }, .1);         

        let ctm = 150;
        ist.style.bottom = `${ctm}px`;        
        
        }
        else{
           let opac = 100;
           let d = setInterval(() => {
               clock.style.opacity = `${opac}%`;
               opac-=1;

               if(opac<0){
                   clearInterval(d);
                   let dopac = 25;
                   digclock.style.opacity = '20%';
                   clock.style.display = `none`;
                   digclock.style.display = `flex`;
                   let t = setInterval(() =>{
                       digclock.style.opacity = `${dopac}%`;
                       dopac+=1;
                       if(dopac >100){
                         clearInterval(t);
                       }
                   }, .1);
               }
           }, .1);
           let btm = 440;
           ist.style.bottom = `${btm}px`;        
        }    
    }

});
