const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intevalId = null;

refs.startBtn.addEventListener('click', () => {
  intevalId = setInterval(() => {
    addBgColorForBody();
  }, 1000);

  startTimer();
  addBgColorForBody();
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intevalId);
  stopTimer();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startTimer() {
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
}

function stopTimer() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function addBgColorForBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}
