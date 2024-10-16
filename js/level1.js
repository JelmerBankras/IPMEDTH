const images = [
    { "src": "boom.png", "audio": "boom.mp3", "alt": "Boom" },
    { "src": "vogel.png", "audio": "vogel.mp3", "alt": "Vogel" },
    { "src": "eekhoorn.png", "audio": "eekhoorn.mp3", "alt": "Eekhoorn" },
    { "src": "beer.png", "audio": "beer.mp3", "alt": "Beer" },
    { "src": "vos.png", "audio": "vos.mp3", "alt": "Vos" },
    { "src": "bloem.png", "audio": "bloem.mp3", "alt": "Bloem" },
    { "src": "paddenstoel.png", "audio": "paddenstoel.mp3", "alt": "Paddenstoel" }
];

function contentUpdated(){
    let percentage = ((100 / images.length) * currentIndex);
    setProgressBar(percentage);
}

function setProgressBar(percentage) {
    // Ensure percentage is between 0 and 100
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Set the width of the progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
}
