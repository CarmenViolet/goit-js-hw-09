import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let timerId = null;
let milliseconds = 0;

buttonStart.addEventListener('click', timerButtonOn);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    milliseconds = selectedDates[0] - new Date();
      if(selectedDates[0] >= new Date()) {
        buttonStart.disabled = false;
      } else {
        buttonStart.disabled = true;
        alert('Please choose a date in the future')
      }
    },
  };

const fp = flatpickr("#datetime-picker", options)

function timerButtonOn() {
    timerId = setInterval(countdownOn, 1000, milliseconds)
}

function countdownOn() {
    if(milliseconds === 0) {
        clearInterval(timerId);
    }

    days.innerHTML = pad(convertMs(milliseconds).days);
    hours.innerHTML = pad(convertMs(milliseconds).hours);
    minutes.innerHTML = pad(convertMs(milliseconds).minutes);
    seconds.innerHTML = pad(convertMs(milliseconds).seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}  