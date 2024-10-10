async function fecthCep() {
    let Cep = documento.getElementById('cep').value;
    let url = `https://viacep.com.br/ws/${Cep}/json/`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function listarCep() {
    if (document.getElementById('cep').value.length < 7) {
        alert('Digite um CEP válido');
        const lista = await fecthCep();

        documento.getElementById('logradouro').value = lista.logradouro;
        documento.getElementById('bairro').value = lista.bairro;
        documento.getElementById('cidade').value = lista.localidade;
        documento.getElementById('estado').value = lista.uf;

        return;
    }
    
}

function busca() {
    listarCep();
}