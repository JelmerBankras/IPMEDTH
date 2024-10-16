const images = [
    { "src": "koe.png", "audio": "koe.mp3", "alt": "Koe" },
    { "src": "schaap.png", "audio": "schaap.mp3", "alt": "Schaap" },
    { "src": "paard.png", "audio": "paard.mp3", "alt": "Paard" },
    { "src": "boer.png", "audio": "boer.mp3", "alt": "Boer" },
    { "src": "tractor.png", "audio": "tractor.mp3", "alt": "Tractor" },
    { "src": "kip.png", "audio": "kip.mp3", "alt": "Kip" },
    { "src": "hooi.png", "audio": "hooi.mp3", "alt": "Hooi" },
];
let currentLevel = "level3";

function finished(){
    localStorage.setItem("level3completed", true);
}
