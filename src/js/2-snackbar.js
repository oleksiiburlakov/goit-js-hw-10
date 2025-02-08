import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('.btn');
const radioButtons = document.querySelectorAll('input[name="state"]');
const input = document.querySelector('.inp2');
const form = document.querySelector('.form');

let val;

input.addEventListener('input', ev =>{
    val = +ev.target.value;
});

btn.addEventListener('click', ev => {
    ev.preventDefault();

    let selectedValue;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            break;
        }
    }

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
        if(selectedValue === "fulfilled"){
            resolve(iziToast.success({
                message: `✅ Fulfilled promise in ${currentVal}ms`,
                timeout: 5000,
                position: 'topRight'
            }));
        } else {
            reject(iziToast.error({
                message: `❌ Rejected promise in ${currentVal}ms`,
                timeout: 5000,
                position: 'topRight'
            }))
        }
    }, currentVal);
    })
    form.reset();
})