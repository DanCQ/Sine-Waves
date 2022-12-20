const canvas = document.getElementById("canvas");
const portfolio = document.querySelector(".portfolio");
const slider = document.querySelector(".slider");

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
canvas.height = screenHeight;
canvas.width = screenWidth;
c = canvas.getContext("2d");

const sliderColor = document.getElementById("color");
const colorRange = document.getElementById("color-range");
const sliderSat = document.getElementById("saturation");
const satRange = document.getElementById("saturation-range");
const sliderLight = document.getElementById("lightness");
const lightRange = document.getElementById("light-range");

let allow = true;
let off;
let time = 0;


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


let wave = {
    y: screenHeight / 2,
    length: randomRange(-0.01, 0.01),
    amplitude: randomRange(-250, 250),
    frequency: randomRange(-0.01, 1)
}

let increment = wave.frequency;
let color = {
    h: sliderColor.value,
    l: sliderLight,
    s: sliderSat.value
}

function animate() {

    requestAnimationFrame(animate);

    c.fillStyle = `rgba(0, 0, 0, 0.01)`;
    c.fillRect(0,0,screenWidth,screenHeight);
    
    c.beginPath();
    c.moveTo(0, screenHeight / 2);
    for(i = 0; i < screenWidth; i++) {
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }
    c.strokeStyle = `hsl(${color.h * Math.sin(increment)}, ${color.s}%, ${color.l}%)`;
    c.stroke();
    c.closePath();
    
    
    increment += wave.frequency;
    wave.y = screenHeight / 2,
    
    color.h = sliderColor.value;
    colorRange.innerHTML = sliderColor.value;
    color.l = sliderLight.value;
    lightRange.innerHTML = sliderLight.value;
    color.s = sliderSat.value;
    satRange.innerHTML = sliderSat.value;
    
}


canvas.addEventListener("click", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    portfolio.style.visibility = "visible";
    slider.style.visibility = "visible";

    time = 10000; //10 seconds, resets on click
    
    if(allow) {

        allow = false; //prevents multiple intervals

        off = setInterval(() => {
            time -= 1000;
        
            if(time <= 0) {
                portfolio.style.visibility = "hidden";
                slider.style.visibility = "hidden";
                clearInterval(off);
                allow = true;
            }
        }, 1000);
    }
});


//prevents infite loop when loading page on mobile
setTimeout(function() {
    window.addEventListener("resize", function() {
        
        //Only way found to avoid a canvas resize bug on mobile
        setTimeout(function() {
            screenHeight = window.innerHeight;
            screenWidth = window.innerWidth;
            canvas.height = screenHeight;
            canvas.width = screenWidth;
        },100);
    });
}, 25); 


window.onload = function() {

    animate();

};
