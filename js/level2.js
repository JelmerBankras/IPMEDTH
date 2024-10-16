const images = [
    { "src": "fiets.png", "audio": "fiets.mp3", "alt": "Fiets" },
    { "src": "helm.png", "audio": "helm.mp3", "alt": "Helm" },
    { "src": "band.png", "audio": "band.mp3", "alt": "Band" },
    { "src": "auto.png", "audio": "auto.mp3", "alt": "Auto" },
    { "src": "verkeerslicht.png", "audio": "verkeerslicht.mp3", "alt": "Verkeerslicht" },
    { "src": "fietsbel.png", "audio": "fietsbel.mp3", "alt": "Fietsbel" },
    { "src": "zebrapad.png", "audio": "zebrapad.mp3", "alt": "Zebrapad" },
];

let interval;
let amountCorrect = -1;
let time = 0;
let currentScore = -100;

function contentUpdated(){
    const progress = document.getElementById("js--progress");
    const streak = document.getElementById("js--streak");
    const timer = document.getElementById("js--timer");
    const score = document.getElementById("js--score");

    progress.innerHTML = (currentIndex + 1) + " / " + images.length;
    amountCorrect++;
    streak.innerHTML = amountCorrect;

    if(time === 0) time = 1;
    if(time > 10) time = 10;
    if(interval !== null) {
        clearInterval(interval);
        let newScore = Math.round(100 / time);
        currentScore += newScore;
    }

    score.innerHTML = currentScore;

    interval = setInterval(() => {
        time++;
        timer.innerHTML = time + "s";
    }, 1000);

    time = 0;
}

function finished(){
    localStorage.setItem("level2completed", true);
}
function wrongAnswer(){
    amountCorrect = 0;
    const streak = document.getElementById("js--streak");
    streak.innerHTML = amountCorrect;
}