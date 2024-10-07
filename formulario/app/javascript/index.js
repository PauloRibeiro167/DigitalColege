import { openModal } from './modal.js';

let nomeProduto = document.getElementById('nome');
let valorProduto = document.getElementById('valor');
let quantidadeProduto = document.getElementById('qtd');
let imgProduto = document.getElementById('img');
let produtos = [];
let id = 1;

function forReal(input) {
  let value = input.value.replace(/\D/g, '');
  value = (value / 100).toFixed(2) + '';
  value = value.replace('.', ',');
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  input.value = 'R$ ' + value;
}

function validarDados(event) {
  event.preventDefault();
  const campos = [nomeProduto, valorProduto, quantidadeProduto, imgProduto];
  campos.forEach((campo) => {
    const valorCampo = campo.value.trim();
    if (valorCampo.length !== 0) {
      campo.classList.remove('is-invalid');
      campo.classList.add('is-valid');
    } else {
      campo.classList.remove('is-valid');
      campo.classList.add('is-invalid');
    }
  });
}

function validarImagem(file) {
  const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];
  return validExtensions.includes(file.type);
}

function cadastrarProdutor() {
  if (nomeProduto.value && valorProduto.value && quantidadeProduto.value && imgProduto.files.length > 0) {
    const file = imgProduto.files[0];
    if (!validarImagem(file)) {
      alert('Por favor, selecione um arquivo de imagem válido (JPEG, PNG, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      produtos.push({
        id: id,
        nome: nomeProduto.value,
        valProduto: valorProduto.value,
        qtdProduto: quantidadeProduto.value,
        img: e.target.result
      });
      id++;
      renderProdutos();
    };
    reader.readAsDataURL(file);
  } else {
  }
}

function renderProdutos() {
  const conteudoTabela = document.getElementById('conteudoTabela');
  conteudoTabela.innerHTML = ``;
  produtos.forEach((item) => {
    conteudoTabela.innerHTML += `
      <tr id="linha-${item.id}">
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.valProduto}</td>
        <td>${item.qtdProduto}</td>
        <td><img style="width: 40px; height: 40px" src="${item.img}"></td>
        <td>
          <button onclick="updateProduto(${item.id})" type="button" class="btn btn-warning">Update</button>
          <button onclick="destroyProduto(${item.id})" type="button" class="btn btn-danger">Destroy</button>
        </td>
      </tr>
    `;
  });
}

function updateProduto(id) {
  const produto = produtos.find(item => item.id === id);
  if (!produto) return;

  const valorSemFormatacao = produto.valProduto.replace('R$ ', '').replace('.', '').replace(',', '.');

  const contentHtml = `
          <label for="novoNome">Nome do Produto</label>
          <input type="text" id="novoNome" class="form-control" value="${produto.nome}">
          <label for="novoValor">Valor</label>
          <input type="number" id="novoValor" class="form-control" value="${valorSemFormatacao}">
          <label for="novaQuantidade">Quantidade</label>
          <input type="number" id="novaQuantidade" class="form-control" value="${produto.qtdProduto}">
          <label for="novaImagem">Imagem</label>
          <input type="file" id="novaImagem" class="form-control">
      `;

  openModal('Atualizar Produto', contentHtml, () => {
    const novoNome = document.getElementById('novoNome').value;
    const novoValor = document.getElementById('novoValor').value;
    const novaQuantidade = document.getElementById('novaQuantidade').value;
    const novaImagem = document.getElementById('novaImagem').files[0];

    if (novoNome && novoValor && novaQuantidade) {
      const reader = new FileReader();
      reader.onload = function (e) {
        produtos = produtos.map((item) => {
          if (item.id === id) {
            return {
              id: id,
              nome: novoNome,
              valProduto: 'R$ ' + parseFloat(novoValor).toFixed(2).replace('.', ','),
              qtdProduto: novaQuantidade,
              img: novaImagem ? e.target.result : item.img,
            };
          }
          return item;
        });
        renderProdutos();
      };
      if (novaImagem) {
        reader.readAsDataURL(novaImagem);
      } else {
        reader.onload();
      }
    }
  });
}

function destroyProduto(id) {
  const produto = produtos.find(item => item.id === id);
  if (!produto) return;

  const contentHtml = `Tem certeza que deseja excluir o produto "${produto.nome}"?`;

  openModal('Confirmação', contentHtml, () => {
    produtos = produtos.filter((item) => item.id !== id);
    const linha = document.getElementById(`linha-${id}`);
    if (linha) {
      linha.remove();
    }
  });
}
window.forReal = forReal;
window.validarDados = validarDados;
window.cadastrarProdutor = cadastrarProdutor;
window.updateProduto = updateProduto;
window.destroyProduto = destroyProduto;