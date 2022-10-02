import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  items: document.querySelectorAll('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let timerDeadline = null;

const timer = {
  intervalId: null,
  notifyOptions: {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
  },
  flatpickrOptions: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      timerDeadline = selectedDates[0].getTime();

      if (timerDeadline <= Date.now()) {
        Notify.failure(
          'Please choose a date in the future',
          timer.notifyOptions
        );
        refs.btnStart.setAttribute('disabled', false);
        return;
      }
      refs.btnStart.toggleAttribute('disabled');
    },
  },

  start() {
    refs.btnStart.setAttribute('disabled', false);
    const qwe = refs.btnStart.addEventListener('click', onBtnStartClick);

    flatpickr(refs.input, this.flatpickrOptions);

    function onBtnStartClick() {
      refs.items.forEach(item => item.classList.toggle('end'));
      refs.btnStart.disabled = true;
      refs.input.disabled = true;

      this.intervalId = setInterval(() => {
        const choosenDate = new Date(refs.input.value);
        const timeToFinish = choosenDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToFinish);

        refs.days.textContent = addLeadinZero(days);
        refs.hours.textContent = addLeadinZero(hours);
        refs.mins.textContent = addLeadinZero(minutes);
        refs.secs.textContent = addLeadinZero(seconds);

        if (timeToFinish < 1000) {
          refs.items.forEach(item => item.classList.toggle('end'));
          clearInterval(this.intervalId);
          refs.input.disabled = false;
        }
      }, 1000);
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function addLeadinZero(value) {
      return String(value).padStart(2, '0');
    }
  },
};

timer.start();
