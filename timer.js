// find elements on page
const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const reloadButton = document.querySelector('button.reload-button');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');

// setup starting variables
let countSec = 0;
let countMin = 0;
let timerMin = 0;
let timerSec = 0;

// formatting helpers
function updateText() {
  minutes.innerHTML = String(countMin).padStart(2, '0');
  seconds.innerHTML = String(countSec).padStart(2, '0');
}

function cleanOnEnd() {
  minutes.style.display = 'none';
  seconds.style.display = 'none';
  timer.style.display = 'none';

  reloadButton.style.display = 'inline-block';
}

// timer logic
function countDown() {
	let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearInterval(timeinterval);
    message.innerHTML = `<p>Таймер на ${timerMin}m${timerSec}s завершён!</p>`
    cleanOnEnd();
  }
  if(countSec > 0) {
    countSec -= 1;
  }
  else {
  	countSec = 59;
    countMin--;
  }
  updateText();
}

function plusHandle() {
  if (countMin === 59 && countSec === 59) {
    return;
  }

  countSec = countSec + 1
  if (countSec > 59) {
    countMin += 1;
    countSec = 0;
  }
  updateText();
}

function minusHandle() {
  if (countSec === 0 && countMin === 0) {
    return;
  }

  if (countSec === 0) {
    countMin -= 1;
    countSec = 59;
  } else {
    countSec -= 1;
  }
  updateText();
}

function startHandle() {
  timerMin = countMin;
  timerSec = countSec;


  plus.style.display = 'none';
  minus.style.display = 'none';
  start.style.display = 'none';

  countDown();
}

// bind functions to elements
plus.onclick = plusHandle;
minus.onclick = minusHandle;
start.onclick = startHandle;
