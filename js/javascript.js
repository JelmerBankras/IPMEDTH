let currentIndex = 0;

function updateContent() {
    const picture = document.getElementById('picture');
    const audio = document.getElementById('audio');
    const playText = document.getElementById("js--playText");
    playText.classList.toggle("hidden");

    if (typeof contentUpdated === "function") {
        contentUpdated();
    }

    picture.src = "/gameresources/images/" + images[currentIndex].src;
    picture.alt = images[currentIndex].alt;
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
    currentIndex = (currentIndex + 1) % images.length;
    updateContent();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateContent();
}

// Function to show the alert overlay
function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('overlay').classList.remove('hidden'); // Show overlay
}

// Function to hide the alert overlay
function hideAlert() {
    document.getElementById('overlay').classList.add('hidden'); // Hide overlay
}

function handleClick(target){
    let guessedText = target.innerHTML;
    let correctText = images[currentIndex].alt;

    if(guessedText == correctText) prevImage();
    else {
        showAlert("incorrect!");
    }
}

updateContent();