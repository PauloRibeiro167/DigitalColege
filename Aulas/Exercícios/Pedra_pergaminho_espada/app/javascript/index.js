function playGame(userChoice) {
    const choices = ['pedra', 'pergaminho', 'espada'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';

    if (userChoice === computerChoice) {
        result = 'Empate!';
    } else if (
        (userChoice === 'pedra' && computerChoice === 'espada') ||
        (userChoice === 'pergaminho' && computerChoice === 'pedra') ||
        (userChoice === 'espada' && computerChoice === 'pergaminho')
    ) {
        result = 'Você ganhou!';
    } else {
        result = 'Você perdeu!';
    }

    const userChoiceImage = getImage(userChoice);
    const computerChoiceImage = getImage(computerChoice);
    document.getElementById('modalBody').innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <img src="${userChoiceImage}" alt="${userChoice}" width="50" height="50">
            <img src="../stylesheet/image/contra.png" alt="vs" width="50" height="50">
            <img src="${computerChoiceImage}" alt="${computerChoice}" width="50" height="50">
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3">
            <p>${result}</p>
        </div>
    `;
    const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    resultadoModal.show();
}

function getImage(choice) {
    switch (choice) {
        case 'pedra':
            return '../stylesheet/image/pedra.png';
        case 'pergaminho':
            return '../stylesheet/image/manuscrito.png';
        case 'espada':
            return '../stylesheet/image/sword.png';
        default:
            return '';
    }
}

window.playGame = playGame;