import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('.btn');
const radioButtons = document.querySelectorAll('input[name="state"]');
const input = document.querySelector('.inp2');
const form = document.querySelector('.form');

let val;

input.addEventListener('input', ev => {
    val = +ev.target.value;
});

form.addEventListener('submit', ev => {
    ev.preventDefault();

    let selectedValue;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            break;
        }
    }

    // Перевірка на коректність значення
    if (isNaN(val) || val <= 0) {
        iziToast.error({
            message: 'Not a number',
            timeout: 5000,
            position: 'topRight'
        });
        return;
    }

    const currentVal = val;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedValue === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${currentVal}ms`);
            } else {
                reject(`❌ Rejected promise in ${currentVal}ms`);
            }
        }, currentVal);
    });

    // Обробка промісу
    promise
        .then(message => {
            iziToast.success({
                message: message,
                timeout: 5000,
                position: 'topRight'
            });
        })
        .catch(errorMessage => {
            iziToast.error({
                message: errorMessage,
                timeout: 5000,
                position: 'topRight'
            });
        });

    // Скидаємо форму і змінну val
    form.reset();
    val = null;  // Оновлюємо значення змінної після скидання форми
});
