const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    };
  });
  if (correct) {
    uploadInfoquote();
    renderNewQuote();
  };
});

let tokenHistInfo = 0;

const uploadInfoquote = () => {
  arrayHistotyTimer.push(getTimerTime());
  arrayHistotyLetters.push(localStorage.getItem('letters'));
  // Call function views History
  showResHistory(tokenHistInfo);
  tokenHistInfo ++;
};

// for(j = 0; j < arrayHistotyTimer.length; j ++) {
//   console.log(`Seconds = ${arrayHistotyTimer[j]} - Letters - ${arrayHistotyLetters[j]}`);
//   tokenHist ++;
// };

// Arrays settings
var arrayHistotyTimer = [];
var arrayHistotyLetters = [];

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
};

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  localStorage.setItem('letters', JSON.stringify(quote.length));
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
};

let startTime
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
};

renderNewQuote();

document.querySelector('#nextText').addEventListener('click', () => renderNewQuote());
document.querySelector('#histRounds').addEventListener('click', () => {
  if(!arrayHistotyLetters.length < 1) {
    document.querySelector('.containerHist').classList.remove("hidden");
  } else {
    alert('Does not yet have a history of past matches!');
  };
});
document.querySelector('#btnCloseHistContainer').addEventListener('click', () => {
    document.querySelector('.containerHist').classList.add("hidden");
});

const showResHistory = (token) => {
  $('#itemList__hist').append(`
    <li class="item">Letters = ${arrayHistotyLetters[token]} - Seconds = ${arrayHistotyTimer[token]}</li>
  `);
};