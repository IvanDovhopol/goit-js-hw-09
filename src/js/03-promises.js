import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;

  let firstDelay = Number(delay.value);
  const stepAfterDelay = Number(step.value);
  const amountEvents = Number(amount.value);

  for (let i = 1; i <= amountEvents; i += 1) {
    createPromise(i, firstDelay);
    firstDelay += stepAfterDelay;
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  const notifyOptions = {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
  };

  promise
    .then(({ position, delay }) => {
      Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`,
        notifyOptions
      );
    })
    .catch(({ position, delay }) => {
      Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`,
        notifyOptions
      );
    });
}
