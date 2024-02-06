import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(sendSuccess)
      .catch(sendError);
  }

  e.target.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function sendIziToast(message, type) {
  iziToast[type]({
    message,
    position: 'topRight',
    transitionIn: 'fadeInDown',
  });
}

function sendSuccess({ position, delay }) {
  sendIziToast(`✅ Fulfilled promise ${position} in ${delay}ms`, 'success');
}

function sendError({ position, delay }) {
  sendIziToast(`❌ Rejected promise ${position} in ${delay}ms`, 'error');
}
