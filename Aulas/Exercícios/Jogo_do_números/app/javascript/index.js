let secretNumber = Math.floor(Math.random() * 50) + 1;
let chances = 5;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const chancesDisplay = document.getElementById('chances');
const restartButton = document.getElementById('restartButton');

guessButton.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
        message.textContent = "⚠️ Por favor, insira um número entre 1 e 50.";
        return;
    }

    if (userGuess === secretNumber) {
        message.textContent = "🎊 Parabéns! Você acertou o número! 🎉";
        guessButton.disabled = true;
        restartButton.style.display = 'block';
    } else {
        chances--;
        if (chances > 0) {
            message.textContent = "❌ Errado! Tente novamente.";
            chancesDisplay.textContent = chances;
        } else {
            message.textContent = `😢 Você esgotou suas chances! O número era ${secretNumber}.`;
            guessButton.disabled = true;
            restartButton.style.display = 'block';
        }
    }

    guessInput.value = '';
});

restartButton.addEventListener('click', () => {
    secretNumber = Math.floor(Math.random() * 50) + 1;
    chances = 5;
    chancesDisplay.textContent = chances;
    message.textContent = '';
    guessButton.disabled = false;
    restartButton.style.display = 'none';
    guessInput.value = '';
});