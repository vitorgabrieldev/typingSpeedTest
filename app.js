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
    addToLocalstorage(getTimerTime());
    uploadSetTokenJSON(histJson);
    renderNewQuote();
  };
});

if(!localStorage.getItem('tokenJSON')) {
  localStorage.setItem('tokenJSON', JSON.stringify(1));
};

var histJson = localStorage.getItem('tokenJSON');

// Settings token JSON
const uploadSetTokenJSON = (token) => localStorage.setItem('tokenJSON', JSON.stringify(token));

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
};

async function renderNewQuote() {
  const quote = await getRandomQuote();
  localStorage.setItem('lettersQuote', JSON.stringify(quote.length));
  quoteDisplayElement.innerHTML = '';
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
  document.querySelector('.containerHist').classList.remove("hidden");
});
document.querySelector('#btnCloseHistContainer').addEventListener('click', () => {
  document.querySelector('.containerHist').classList.add("hidden");
});

const addToLocalstorage = (object) => {
  localStorage.setItem(histJson, JSON.stringify(object));

    let timeJSON = localStorage.getItem(histJson);
    console.log(timeJSON);
    let lettersJSON = localStorage.getItem(lettersQuote);
    console.log(lettersJSON);
      // Print DOM
      $("#itemList__hist").append(`
        <li class="item">Letters = ${lettersJSON} - Seconds = ${timeJSON}</li>
      `);
  histJson ++;
};