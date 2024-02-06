import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

let variables = {
  selectedDate: null,
  intervalId: null,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      showError('Please choose a date in the future');
      return;
    }
    elements.startBtn.disabled = false;
    elements.input.disabled = true;
    variables.selectedDate = selectedDate;
  },
};

flatpickr(elements.input, options);

function showError(message) {
  iziToast.error({
    message: message,
    position: 'topCenter',
    transitionIn: 'fadeInDown',
  });
  elements.startBtn.disabled = true;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

function startTimer() {
  variables.intervalId = setInterval(() => {
    const currentDate = new Date();
    const ms = variables.selectedDate - currentDate;
    if (ms <= 0) {
      clearInterval(variables.intervalId);
      variables.intervalId = null;
      elements.input.disabled = false;
      return;
    }
    const time = convertMs(ms);
    elements.days.textContent = addLeadingZero(time.days);
    elements.hours.textContent = addLeadingZero(time.hours);
    elements.mins.textContent = addLeadingZero(time.minutes);
    elements.secs.textContent = addLeadingZero(time.seconds);
  }, 1000);
  elements.startBtn.disabled = true;
}

elements.startBtn.addEventListener('click', () => {
  if (!variables.intervalId) startTimer();
});
