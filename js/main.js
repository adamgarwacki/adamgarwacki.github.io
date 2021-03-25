'use strict';

// poniższy kod zapamiętuje które okno było wyświetlane jako ostatnie;
//  było to konieczne, ponieważ z niestety nieznanych mi przyczyn
//  przy odświeżaniu karty strona otwierała się na złym oknie,
//  a w większości przypadków na kilku z nich jednocześnie;
window.addEventListener('load', () => {
    let collection = document.getElementsByClassName('section');
    let allSec = Array.prototype.slice.call(collection);

    let previousPageNum = sessionStorage.previousPageNum;
    if (previousPageNum) {
        
        // console.log(allSec);
        for (let el of allSec) {
            if (allSec.indexOf(el) + 1 < previousPageNum) {
                el.classList.add('slide-up');
            } else if (allSec.indexOf(el) + 1 > previousPageNum) {
                el.classList.add('slide-down');
            }
        };
    } else {
        for (let el of allSec.slice(1, 5)) {
            el.classList.add('slide-down');
        }
    }
});

// Ekran ładowania (wachlarz):

let myCanvas = document.getElementById('loading-screen-canvas');
let ctx = myCanvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;


ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx.translate(canvasWidth / 2, 2 * canvasHeight / 3);


// PARAMETRY:

let baseWidth = 30;
let baseHeight = 0;
let topWidth = 75;
let topHeight = 340;
let dotRadius = 40;
let lineSize = 10;


// te dwie reguły zmieniają rozmiar potrzebny przy rwd
if (window.innerWidth < 1200) {
    baseWidth = 20;
    topWidth = 50;
    topHeight = 250;
    dotRadius = 30;
    lineSize = 7;
}

if (window.innerWidth < 640) {
    baseWidth = 10;
    topWidth = 25;
    topHeight = 120;
    dotRadius = 15;
    lineSize = 4;
}

let drawFan = () => {
    ctx.beginPath();
    ctx.moveTo(-baseWidth, -baseHeight);
    ctx.lineTo(baseWidth, -baseHeight);
    ctx.lineTo(topWidth, -topHeight);
    ctx.arc(0, -topHeight, topWidth, 0, Math.PI, true);
    ctx.lineTo(-baseWidth, -baseHeight);
    ctx.closePath();
    ctx.fillStyle = '#e34b4b';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = lineSize;
    ctx.stroke();
}


let drawDot = () => {
    ctx.beginPath();
    ctx.arc(0, 0, dotRadius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fillStyle = '#e34b4b';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = lineSize;
    ctx.stroke();
}

// baseSpeed to wartość zwielokrotniana dla każdego punktu, żeby stworzyć wachlarz
let baseSpeed = 2;
// anchorRadius dedfinuje odległość punktów zaczepienia figur od punktu obrotu
let anchorRadius = 0;
// baseAngleValue przechowuje wartość kąta bazowego, którego wielokrotności służą do określania położenia punktów zaczepienia
let baseAngleValue = 0;
// partsQuantity definuje ilość ramion wachlarza; oprócz podanej liczby zawsze będzie generować się jedno dodatkowe ramię o niezmiennej pozycji
let partsQuantity = 4;

// --------------------------------------------------------------------------------

let pointsArr = [];
for (let i = 1; i <= partsQuantity; i++) {
    let partObj = {
        speed: baseSpeed * i,
        valX: 0,
        valY: -anchorRadius
    }
    pointsArr.push(partObj);
}

// partsNum to zmienna przechowująca ilość "ramion" wachlarza, pozwalająca wyświetlanie ich w równych odstępach
let partsNum = pointsArr.length;

// logArg to argument funkcji logarytmicznej kontrolującej tempo rozkładania się wachlarza
let logArg = 1;

let draw = () => {
    window.requestAnimationFrame(draw);

    if (baseAngleValue <= 90) {
        ctx.clearRect(-canvasWidth/2, -2 * canvasHeight/3, canvasWidth, canvasHeight);

        transformImage(0, -anchorRadius, 0);
        pointsArr.forEach((p) => {
            let pIndex = pointsArr.indexOf(p) + 1;
            let pointTransformAngle = (p.speed / partsNum) * Math.PI / 180;
            let figureRotateAngle = (baseAngleValue * pIndex / partsNum) * Math.PI / 180;

            p.valX = Math.cos(pointTransformAngle) * p.valX - Math.sin(pointTransformAngle) * p.valY;
            p.valY = Math.sin(pointTransformAngle) * p.valX + Math.cos(pointTransformAngle) * p.valY;
            
            transformImage(-p.valX, p.valY, -figureRotateAngle);
            transformImage(p.valX, p.valY, figureRotateAngle);
        });
        drawDot();
        baseAngleValue += baseSpeed * Math.log(logArg);
        logArg += 0.1;
    }
}

// funkcja bierze obraz do obrócenia/przesunięcia, punkt w którym ma się obrócić, kąt (w radianach) o jaki ma się obrócić
let transformImage = (x, y, rad) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad);
    // ctx.stroke(img);
    drawFan();
    ctx.restore();
}

transformImage(0, -anchorRadius, 0);
drawDot();



// dwie wersje rozkładania się wachlarza: po kliknięciu (nieaktywne) / po ustalonym czasie;

// ------------------------------

myCanvas.addEventListener('click', () => {
    draw();
    setTimeout(() => {
        let canvasContainer = document.getElementById('loading-screen');
        canvasContainer.classList.add('vanish');
        setTimeout(() => {
            canvasContainer.style.display = 'none';
        }, 500);
    }, 800);
});

// setTimeout(() => {
//     draw();
//     setTimeout(() => {
//         let canvasContainer = document.getElementById('loading-screen');
//         canvasContainer.classList.add('vanish');
//         setTimeout(() => {
//             canvasContainer.style.display = 'none';
//         }, 500);
//     }, 800);
// }, 300);

// ----------------------------------


// Efekt przejścia od tytułu:
// window.addEventListener('scroll', () => {
//     let scrollValue = window.pageYOffset;
//     let windowHeight = window.innerHeight;
//     let cloudBox = document.getElementById('cloud-box');

//     // Zanikanie chmur:
//     let cloudOpacity = 1 - scrollValue/(windowHeight - 200);
//     if(cloudOpacity > 0) {
//         cloudBox.style.opacity = cloudOpacity;
//     } else {
//         cloudBox.style.opacity = 0;
//     }

//     // Rozszerzanie się, odchylanie na boki:
//     if(scrollValue < windowHeight) {
//         cloudBox.style.width = `${window.innerWidth + scrollValue/2}px`;
//         cloudBox.style.left = `-${scrollValue/4}px`;
//     }
// });

// Przejścia między kartami:

let changePanel = (currNum, nextNum) => {
    console.log(currNum);
    let currentPanel = document.getElementById(`sec-${currNum}`);
    let nextPanel = document.getElementById(`sec-${nextNum}`);

    let panelSlide = () => {
        if (nextNum > currNum) {
            currentPanel.classList.add('slide-up');
            setTimeout(() => nextPanel.classList.remove('slide-down'), 1000);
            // console.log('neeext');
        } else {
            currentPanel.classList.add('slide-down');
            setTimeout(() => nextPanel.classList.remove('slide-up'), 1000);
            // console.log('baaack');
        }
    }

    switch (currNum) {
        case 1:
            let cloudContainer = document.getElementById('cloud-container');
            cloudContainer.classList.add('cloud-container-split');

            panelSlide();

            setTimeout(() => {
                cloudContainer.classList.remove('cloud-container-split');
            }, 1000);
            break;
            
        case 2:
            let lampionContainer = document.getElementById('lampion-container');
            lampionContainer.classList.add('lampion-fade');

            setTimeout(() => {
                panelSlide();
            }, 500);

            setTimeout(() => {
                lampionContainer.classList.remove('lampion-fade');
            }, 1000);
            break;
            
        case 3:
            panelSlide();
            break;
            
        case 4:
            panelSlide();
            break;
            
        case 5:
            panelSlide();
            break;

        default:
            break;
    }

    sessionStorage.setItem('previousPageNum', nextNum);
}

// formularz:
let contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    contactForm.reset();
});



// todo punkt 6:
let allowScroll = true;
window.addEventListener("wheel", event => {
    if (allowScroll) {
        console.info(event.deltaY);

        allowScroll = false;
        setTimeout(() => allowScroll = true, 2000);
    }
});