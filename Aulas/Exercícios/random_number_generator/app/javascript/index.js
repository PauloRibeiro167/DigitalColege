document.getElementById('randomNumberForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const minNumber = parseInt(document.getElementById('minNumber').value, 10);
    const maxNumber = parseInt(document.getElementById('maxNumber').value, 10);
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    document.getElementById('modalBody').innerText = `Número aleatório gerado: ${randomNumber}`;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});