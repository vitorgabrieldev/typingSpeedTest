const arrayText = [
    {text: 'Olá, meu nome é Vitor Gabriel De Oliveira, este é um teste de digitação'},
    {text: 'Eu amo programação, acho algo incrivela liberdade de criação'},
    {text: 'Eu amo muito muito muito uma pessoa, espero que ela saiba muito bem disso'},
    {text: 'Adoro fazer longas calls, nunca me canso de falar nelas'},
    {text: 'Comprei uma calça e uma camisa muito bonita, junto de um teclado e um mouse'},
];

// Settings Tokens
let tokenText = 0;
let arrayTyping = '';

window.addEventListener('load', () => {settingsTyping.mainSettings()});

const settingsTyping = {
    mainSettings: function() {
        document.querySelector('#text').innerHTML = arrayText[tokenText].text;
    },
    nextText: function() {
        if(tokenText >= arrayText.length - 1) {
            tokenText = 0;
        } else {
            tokenText ++;
        };
        document.querySelector('#text').innerHTML = arrayText[tokenText].text;
    },
    verifyTyping: function() {;
        if(document.querySelector('#inputLetters').value === arrayText[tokenText].text) {
            console.log('Correto!')
        } else {
            console.log('Error!')
        };
    },
};
document.querySelector('#nextText').addEventListener('click', () => {settingsTyping.nextText()});