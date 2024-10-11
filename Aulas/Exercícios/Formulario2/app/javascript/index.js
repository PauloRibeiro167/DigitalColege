async function fetchCep() {
  let cep = document.getElementById('cep').value;
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados" + cep + "/json/";

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAddressByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
  }
}

document.getElementById('cep').addEventListener('blur', async () => {
  const cep = document.getElementById('cep').value;
  const addressData = await fetchAddressByCep(cep);
  console.log(addressData);

  if (addressData) {
    document.getElementById('rua').value = addressData.logradouro || '';
    document.getElementById('bairro').value = addressData.bairro || '';
    document.getElementById('municipio').value = addressData.localidade || '';
    document.getElementById('uf').value = addressData.uf || '';
  }
});


async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401) {
      console.error('Unauthorized access - perhaps your API key is invalid or expired.');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function populateUFs() {
  const ufSelect = document.getElementById('uf');
  const ufs = await fetchData("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

  ufs.forEach(uf => {
    const option = document.createElement('option');
    option.value = uf.sigla;
    option.textContent = uf.nome;
    ufSelect.appendChild(option);
  });
}


async function populateMunicipios() {
  const ufSelect = document.getElementById('uf');
  const municipioSelect = document.getElementById('municipio');
  municipioSelect.innerHTML = '<option value="">Selecione um município</option>';

  if (ufSelect.value) {
    const municipios = await fetchData(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelect.value}/municipios`);

    municipios.forEach(municipio => {
      const option = document.createElement('option');
      option.value = municipio.nome;
      option.textContent = municipio.nome;
      option.setAttribute('data-ibge', municipio.id);
      municipioSelect.appendChild(option);
    });
  }
}


async function populateBairros() {
  const municipioSelect = document.getElementById('municipio');
  const bairroSelect = document.getElementById('bairro');
  bairroSelect.innerHTML = '<option value="">Selecione um bairro</option>';

  if (municipioSelect.value) {
    const selectedOption = municipioSelect.options[municipioSelect.selectedIndex];
    const municipioId = selectedOption.getAttribute('data-ibge') || "";

    if (municipioId) {
      const bairros = await fetchData(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipioId}/distritos`);

      if (Array.isArray(bairros)) {
        const filteredBairros = bairros.filter(bairro => bairro.municipio.id === parseInt(municipioId));

        filteredBairros.forEach(bairro => {
          const option = document.createElement('option');
          option.value = bairro.id;
          option.textContent = bairro.nome;
          bairroSelect.appendChild(option);
        });
      }
    }
  }
}

// async function populateBairros() {
//   const municipioSelect = document.getElementById('municipio');
//   const bairroSelect = document.getElementById('bairro');
//   bairroSelect.innerHTML = '<option value="">Selecione um bairro</option>';

//   if (municipioSelect.value) {
//     const selectedOption = municipioSelect.options[municipioSelect.selectedIndex];
//     const municipioId = selectedOption.getAttribute('data-ibge') || "";
//     // console.log(`Selected Municipio ID: ${municipioId}`); 

//     if (municipioId) {
//       const bairros = await fetchData(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipioId}/distritos`);
//       // console.log(`Bairros: ${JSON.stringify(bairros)}`); 

//       // console.log(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipioId}/distritos`);
//       if (Array.isArray(bairros)) {
//         const filteredBairros = bairros.filter(bairro => bairro.municipio.id === parseInt(municipioId));
//         // console.log('Filtered Bairros:', filteredBairros.map(bairro => bairro.nome));

//         filteredBairros.forEach(bairro => {
//           const option = document.createElement('option');
//           option.value = bairro.id;
//           option.textContent = bairro.nome;
//           bairroSelect.appendChild(option);
//         });
//       //   if (filteredBairros.length > 0) {
//       //     const mesoregiao = filteredBairros[0].municipio.microrregiao.mesorregiao.nome;
//       //     const bairrosNaMesoregiao = filteredBairros.map(bairro => bairro.nome);
//       //     console.log(`Mesoregiao: ${mesoregiao}, Bairros: ${bairrosNaMesoregiao.join(', ')}`);
//       //   }
//       //   if (filteredBairros.length > 0) {
//       //     const mesoregiao = filteredBairros[0].municipio.microrregiao.mesorregiao.nome;
//       //     console.log(`Mesoregiao: ${mesoregiao}`);
//       //   }
//       // } else {
//       //   console.error('A resposta da API não é um array:', bairros);
//       }
//     }
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  populateUFs();

  document.getElementById('uf').addEventListener('change', populateMunicipios);
  document.getElementById('municipio').addEventListener('change', populateBairros);
});