import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', generatePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise ((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }}, delay )
});
};

function generatePromises(event) {
  event.preventDefault();

let {delay, step, amount} = event.target.elements; 
delay = Number(delay.value);

for(let amo = 1; amo <= amount.value; amo += 1) {
  createPromise(amo, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += Number(step.value);
}
}