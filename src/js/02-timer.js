import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const refs = {
 days: document.querySelector('[data-days]'),
 hours: document.querySelector('[data-hours]'),
 minutes: document.querySelector('[data-minutes]'),
 seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;
let milliseconds = 0;

buttonStart.addEventListener('click', timerButtonOn);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    milliseconds = selectedDates[0];
    
      if(selectedDates[0] <= new Date()) {
        buttonStart.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future')
      } else if (selectedDates[0] >= new Date()) {
        buttonStart.disabled = false;
      }
    },
  };

const fp = flatpickr("#datetime-picker", options)

function timerButtonOn() {
  buttonStart.disabled = true;
    timerId = setInterval(countdownOn, 1000, milliseconds)
}

function countdownOn() {
    if(milliseconds === 0) {
        clearInterval(timerId);
    }
    const newDate = new Date().getTime();
    const deltaTime = milliseconds - newDate;

    let refs = convertMs(deltaTime);

    for(let key of Object.keys(refs)) {
      document.querySelector(`[data-${key}]`).textContent = pad(refs[key]);
    }
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