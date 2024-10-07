function openModal(title, contentHtml, onConfirm, onCancel) {
    const modalHtml = `
        <div class="custom-modal" id="customModal">
            <div class="custom-modal-content">
                <div class="custom-modal-header">
                    <h5>${title}</h5>
                    <button type="button" id="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    ${contentHtml}
                </div>
                <div class="custom-modal-footer">
                    <button type="button" id="cancelBtn">Cancelar</button>
                    <button type="button" id="confirmBtn">Confirmar</button>
                </div>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);

    const modal = document.getElementById('customModal');
    modal.style.display = 'block';

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
        modalContainer.remove();
        if (onCancel) onCancel();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
        modal.style.display = 'none';
        modalContainer.remove();
        if (onCancel) onCancel();
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        if (onConfirm) onConfirm();
        modal.style.display = 'none';
        modalContainer.remove();
    });
}

export { openModal };