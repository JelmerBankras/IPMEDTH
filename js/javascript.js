let currentIndex = 0;

function updateContent() {
    if(currentIndex >= images.length){
        // Completed
        hideSuccess();
        if (typeof finished === "function") {
            finished();
        }
        showDone();
        return;
    }
    const picture = document.getElementsByClassName('picture');
    const audio = document.getElementById('audio');
    const playText = document.getElementById("js--playText");
    const alertMessage = document.getElementById("js--alertMessage");
    playText.classList.toggle("hidden");

    for(let i = 0; i < picture.length; i++){
        picture[i].src = "/gameresources/images/" + images[currentIndex].src;
        picture[i].alt = images[currentIndex].alt;
    }
    alertMessage.innerHTML = images[currentIndex].alt;
    audio.src = "/gameresources/audio/" + images[currentIndex].audio;

    let correctWordPosition = getRandomNumber(1,3, 0, 0);
    let randomWordOne = getRandomNumber(0,images.length - 1, currentIndex, 0);
    let randomWordTwo = getRandomNumber(0,images.length - 1, currentIndex, randomWordOne);

    let wordOneUsed = false;

    let optionBox = document.getElementById("js--optionBox");
    for(let i = 0; i < optionBox.children.length; i++){
        let element = optionBox.children[i];
        if(i + 1 === correctWordPosition){
            element.innerHTML = images[currentIndex].alt;
        }
        else if(wordOneUsed){
            element.innerHTML = images[randomWordTwo].alt;
        }
        else{
            wordOneUsed = true;
            element.innerHTML = images[randomWordOne].alt;
        }
    }

    if (typeof contentUpdated === "function") {
        contentUpdated();
    }
}

function getRandomNumber(min, max, avoid, avoidTwo) {
    // Ensure the min is less than the max
    if (min > max) {
        throw new Error("Min should be less than or equal to Max.");
    }

    let randomNum;

    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNum === avoid || randomNum === avoidTwo); // Repeat if the random number is the one to avoid

    return randomNum;
}

function playAudio() {
    const audio = document.getElementById('audio');
    audio.play();
}

function nextImage() {
    currentIndex = currentIndex + 1;
    updateContent();
}

function prevImage() {
    currentIndex = currentIndex - 1;
    updateContent();
}

// Function to show the alert overlay
function showAlert() {
    document.getElementById('alertOverlay').classList.remove('hidden'); // Show overlay
    playAudio();
    setTimeout(() => {
        hideAlert();
    }, 5000)
}

// Function to hide the alert overlay
function hideAlert() {
    document.getElementById('alertOverlay').classList.add('hidden'); // Hide overlay
}

function showSuccess(){
    document.getElementById('successOverlay').classList.remove('hidden'); // Show overlay
    setTimeout(() => {
        hideSuccess();
    }, 1000)
}

function hideSuccess(){
    document.getElementById('successOverlay').classList.add('hidden'); // Hide overlay
}
function showDone(){
    document.getElementById('doneOverlay').classList.remove('hidden'); // Show overlay
    setTimeout(() => {
        location.href = "/";
    }, 1000)
}

function handleClick(target){
    let guessedText = target.innerHTML;
    let correctText = images[currentIndex].alt;

    if(guessedText == correctText) {
        showSuccess();
        nextImage();
    }
    else {
        if (typeof wrongAnswer === "function") {
            wrongAnswer();
        }
        showAlert();
    }
}

updateContent();