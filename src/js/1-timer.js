import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate;

const startBtn = document.querySelector('.btnInp');
const inp = document.querySelector('.inputD');
const val = {
    days: document.querySelector('.value[data-value="days"]'),
    hours: document.querySelector('.value[data-value="hours"]'),
    minutes: document.querySelector('.value[data-value="minutes"]'),
    seconds: document.querySelector('.value[data-value="seconds"]')
};

startBtn.disabled = true;
const currentDate = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates.length > 0) {
            userSelectedDate = selectedDates[0];
            if(userSelectedDate < currentDate) {
                iziToast.error({
                    message: 'Please choose a date in the future',
                    timeout: 5000,
                    position: 'topRight'

                });
                startBtn.disabled = true;
            } else {
                startBtn.disabled = false;
            }
        } else {
            startBtn.disabled = true;
        }
    }
};

flatpickr(inp, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
    val.days.textContent = addLeadingZero(days);
    val.hours.textContent = addLeadingZero(hours);
    val.minutes.textContent = addLeadingZero(minutes);
    val.seconds.textContent = addLeadingZero(seconds);
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

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    inp.disabled = true;

    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            inp.disabled = false;
            return;
        }
        const time = convertMs(deltaTime);
        updateTimer(time);
    }, 1000);
});