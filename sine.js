const canvas = document.getElementById("canvas");
const portfolio = document.querySelector(".portfolio");
const slider = document.querySelector(".slider");

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
canvas.height = screenHeight;
canvas.width = screenWidth;
c = canvas.getContext("2d");

//for interval use
let allow = true;
let off;
let time = 0;

//slider color controls
const sliderColor = document.getElementById("color");
const colorRange = document.getElementById("color-range");
const sliderLight = document.getElementById("lightness");
const lightRange = document.getElementById("light-range");
const sliderSat = document.getElementById("saturation");
const satRange = document.getElementById("saturation-range");

let color = {
    h: sliderColor.value,
    l: sliderLight,
    s: sliderSat.value
}

//slider wave controls
const amp = document.getElementById("amplitude");
const ampRange = document.getElementById("amp-range");
const freq = document.getElementById("frequency");
const freqRange = document.getElementById("freq-range");
const waveLength = document.getElementById("wave-length");
const lengthRange = document.getElementById("length-range");

let wave = {
    y: screenHeight / 2,
    length: waveLength / 10000, 
    amplitude: amp, 
    frequency: freq.value / 10000
}

let increment = wave.frequency;


function animate() {

    requestAnimationFrame(animate);

    c.fillStyle = `rgba(0, 0, 0, 0.03)`;
    c.fillRect(0,0,screenWidth,screenHeight);
    
    //wave object
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
    
    //update color values
    color.h = sliderColor.value;
    colorRange.innerHTML = sliderColor.value;
    color.l = sliderLight.value;
    lightRange.innerHTML = sliderLight.value;
    color.s = sliderSat.value;
    satRange.innerHTML = sliderSat.value;

    //update wave values
    wave.length = waveLength.value / 10000;
    lengthRange.innerHTML = waveLength.value / 10000;
    wave.amplitude = amp.value;
    ampRange.innerHTML = amp.value;
    wave.frequency = freq.value / 10000;
    freqRange.innerHTML = freq.value / 10000; 
}


canvas.addEventListener("click", function() {

    portfolio.style.visibility = "visible";
    slider.style.visibility = "visible";

    time = 15000; //10 seconds, resets on click
    
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


canvas.addEventListener("mousemove", function() {

    portfolio.style.visibility = "visible";
    slider.style.visibility = "visible";

    time = 15000; //10 seconds, resets on click
    
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
