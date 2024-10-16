let currentIndex = 0;
let currentTime = 0;
function updateContent() {
    if(currentInterval != null) {
        clearInterval(currentInterval);
        currentTime = 0;
    }

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

    currentInterval = setInterval(() => {
        currentTime++;
    }, 1000)

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

let timesToGuess = 0;
let currentInterval;
function handleClick(target){
    let guessedText = target.innerHTML;
    let correctText = images[currentIndex].alt;
    timesToGuess++;
    if(guessedText == correctText) {
        writeToLocal();
        showSuccess();
        nextImage();
        timesToGuess = 0;
    }
    else {
        if (typeof wrongAnswer === "function") {
            wrongAnswer();
        }
        showAlert();
    }
}

function writeToLocal() {
    // Check if currentLevel is defined
    if (typeof currentLevel === "undefined") {
        return;
    }

    // Get the JSON string from localStorage
    let currentJson = localStorage.getItem("JsonScore");

    // If the retrieved item is null or empty, initialize it as an empty object
    if (currentJson === null || currentJson === "") {
        currentJson = {};
    } else {
        // Parse the JSON string to an object
        currentJson = JSON.parse(currentJson);
    }

    // Check if the current level's data exists, if not, initialize it
    let levelJson = currentJson[currentLevel];
    if (levelJson === undefined) {
        levelJson = {};
    }

    // Create a new object with the updated values
    let newJson = {
        "amount": timesToGuess,
        "time": currentTime + ""  // Converting time to string (if necessary)
    };

    // Update the specific image data in the current level
    levelJson[images[currentIndex].alt] = newJson;

    // Save the updated level data back into the main JSON object
    currentJson[currentLevel] = levelJson;

    // Convert the updated object back to a JSON string and store it in localStorage
    localStorage.setItem("JsonScore", JSON.stringify(currentJson));

    console.log(levelJson);
    console.log(currentJson);
}

updateContent();