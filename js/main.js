'use strict';

// Efekt przejścia od tytułu:
window.addEventListener('scroll', () => {
    let scrollValue = window.pageYOffset;
    let windowHeight = window.innerHeight;
    let cloudBox = document.getElementById('cloud-box');

    // Zanikanie chmur:
    let cloudOpacity = 1 - scrollValue/(windowHeight - 200);
    if(cloudOpacity > 0) {
        cloudBox.style.opacity = cloudOpacity;
    } else {
        cloudBox.style.opacity = 0;
    }

    // Rozszerzanie się, odchylanie na boki:
    if(scrollValue < windowHeight) {
        cloudBox.style.width = `${window.innerWidth + scrollValue/2}px`;
        cloudBox.style.left = `-${scrollValue/4}px`;
    }
});