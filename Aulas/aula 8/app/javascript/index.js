let api = fetch('https://randomuser.me/api/?results=20');

let users = [];

const cardContainer = document.getElementById('user-card');

function fetchUsers() {
  fetch('https://randomuser.me/api/?results=20')
    .then(response => response.json())
    .then(data => {
      users = data.results;
      displayUsers(users);
    })
    .catch(error => console.error('error:', error));
}

function displayUsers(users) {
  let cards = '';

  users.forEach(user => {
    cards += `
      <div class="col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${user.picture.large}" class="card-img-top rounded-circle mx-auto mt-3" alt="Foto de ${user.name.first}" style="width: 100px; height: 100px; object-fit: cover;">
          <div class="card-body text-center">
            <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>Telefone:</strong> ${user.phone}</p>
            <p class="card-text"><strong>País:</strong> ${user.location.country}</p>
          </div>
        </div>
      </div>
    `;
  });

  cardContainer.innerHTML = cards;
}

fetchUsers();