function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body');


buttonStart.addEventListener('click', addRandomColorOn);
buttonStop.addEventListener('click', stopRandomColor);
let timerId = null;

function addRandomColorOn() {
    timerId = setInterval(() => {
  return bodyEl.style.background = getRandomHexColor()
   }, 1000)

   buttonStart.disabled = true;
}


function stopRandomColor() {
    clearInterval(timerId);

    buttonStart.disabled = false;
}