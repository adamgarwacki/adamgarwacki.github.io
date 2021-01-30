'use strict';

let initialBGColor = {
    redBGColor: 255,
    greenBGColor: 255,
    blueBGColor: 255
};

let mashBackgroundColor = (redColor, greenColor, blueColor) => {
    initialBGColor.redBGColor = Math.floor((initialBGColor.redBGColor + redColor) / 2);

    initialBGColor.greenBGColor = Math.floor((initialBGColor.greenBGColor + greenColor) / 2);

    initialBGColor.blueBGColor = Math.floor((initialBGColor.blueBGColor + blueColor) / 2);

    document.getElementById('main-container').style = `background-color: rgb(${initialBGColor.redBGColor}, ${initialBGColor.greenBGColor}, ${initialBGColor.blueBGColor});`;
    console.log(initialBGColor);
}

document.getElementById('red-panel').addEventListener('click', () => {
    mashBackgroundColor(255, 0, 0);
});

document.getElementById('green-panel').addEventListener('click', () => {
    mashBackgroundColor(0, 128, 0);
});

document.getElementById('blue-panel').addEventListener('click', () => {
    mashBackgroundColor(0, 0, 255);
});

document.getElementById('yellow-panel').addEventListener('click', () => {
    mashBackgroundColor(255, 255, 0);
});

document.getElementById('white-panel').addEventListener('click', () => {
    initialBGColor.redBGColor = 255;
    initialBGColor.greenBGColor = 255;
    initialBGColor.blueBGColor = 255;

    document.getElementById('main-container').style = `background-color: rgb (255, 255, 255)`;
});

document.getElementById('pink-panel').addEventListener('click', () => {
    mashBackgroundColor(255, 192, 203);
});

document.getElementById('lightblue-panel').addEventListener('click', () => {
    mashBackgroundColor(173, 216, 230);
});

document.getElementById('purple-panel').addEventListener('click', () => {
    mashBackgroundColor(128, 0, 128);
});

document.getElementById('orange-panel').addEventListener('click', () => {
    mashBackgroundColor(255, 165, 0);
});