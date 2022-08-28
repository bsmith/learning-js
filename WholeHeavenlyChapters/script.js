'use strict';

/* some kind of fork? */
const textClock = (elem) => {
    elem.innerText = "Javascript main";
    elem.classList.add("textClock");
 /*   elem.style.width = "256px";
    elem.style.height = "256px";
    elem.style.color = "red";
    elem.style.setProperty("background-color", "white");*/

    /* XXX: here is the thing we want to stick on the end of the micro-queue not the big queue */
    /* I guess add this to a main loop, or be a main loop! */
    /*setTimeout*/new Promise(async () => {
        let counter = 0;
        let lastDate;
        do {
            await new Promise(requestAnimationFrame);
            let now = Date.now();
            let newDate = Math.floor(now / 1000);
            let millis = now % 1000;
            if (newDate != lastDate) {
                elem.innerText = `${newDate}:${millis} <${counter}>`;
                counter = (counter + 1) % 60;
                lastDate = newDate;
            }
        } while (1);
    });
};

// From https://web.dev/canvas-hidipi/
const setupHiDPICanvas = function (canvas) {
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

const fmtNum = function (num, width) {
    let str = `${num}`;
    while (str.length < width) {
        str = '0' + str;
    }
    return str;
}

const canvasClock = (elem) => {
    elem.classList.add("canvasClock");
    const canvas = document.createElement("canvas");
    elem.appendChild(canvas);
    canvas.width = canvas.height = 256;
    const ctx = setupHiDPICanvas(canvas);

    const font = window.getComputedStyle(canvas).getPropertyValue('font');
    console.log(font);
    (()=>{
        const elem = document.createElement("div");
	    document.body.appendChild(elem);
	    elem.innerText = font;
    })();

    const drawClock = (hours, minutes, seconds) => {
        ctx.beginPath();
        ctx.arc(128, 128, 90, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(128, 128);
        ctx.lineTo(128 + 90 * Math.sin(Math.PI * 2 * hours / 12), 128 - 90 * Math.cos(Math.PI * 2 * hours / 12));
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 15;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(128, 128);
        ctx.lineTo(128 + 90 * Math.sin(Math.PI * 2 * minutes / 60), 128 - 90 * Math.cos(Math.PI * 2 * minutes / 60));
        ctx.strokeStyle = "darkgreen";
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(128, 128);
        ctx.lineTo(128 + 90 * Math.sin(Math.PI * 2 * seconds / 60), 128 - 90 * Math.cos(Math.PI * 2 * seconds / 60));
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(128, 128, 17/2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();

        const timeString = `${fmtNum(hours,2)}:${fmtNum(minutes,2)}:${fmtNum(seconds,2)}`;
        ctx.font = font;
        /*const metrics = ctx.measureText(timeString);
        ctx.fillText(timeString, 128 - metrics.width/2, 128+90, 256);*/
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.strokeText(timeString, 128, 256-2, 256);
        ctx.fillText(timeString, 128, 256-2 /*128+90+2*/, 256);
    };

    new Promise(async () => {
        do {
            await new Promise(requestAnimationFrame);
            let now = new Date();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawClock(now.getHours(), now.getMinutes(), now.getSeconds());
        } while (1);
    });
};

const jsMain = function () {
    const outputDiv = document.getElementById("outputDiv");

    const appendNewComponent = (componentAttacher) => {
        const component = document.createElement("div");
        outputDiv.appendChild(component);
        return componentAttacher(component);
    };

    [textClock, canvasClock/*, ledClock, svgClock*/].forEach(appendNewComponent);
}
 
if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', jsMain);
} else {  // `DOMContentLoaded` has already fired
    jsMain();
}
// window.setTimeout(jsMain,1000);
