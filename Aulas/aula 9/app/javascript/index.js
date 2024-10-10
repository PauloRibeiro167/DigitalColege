
//https://randomuser.me/api/

let users = [];

const cardContainer = document.getElementById('user-cards')

function fetchUsers () {
fetch('https://randomuser.me/api/?results=5')
.then( response => response.json())
.then(data => {
        // console.log(data.results[1].phone)
        users = data.results
        displayUsers(users)
    });
}

function displayUsers(users) {

    let cards = '';

    users.forEach(users => {
        cards += `

        <div class="card m-3" style="width: 18rem;">
        <img src="${users.picture.large}" class="card-img-top rounded-circle" alt="...">
        <div class="card-body">
        <h5 class="card-name">${users.name.first}</h5>
        <p class="card-text"><strong>Email:</strong> ${users.email}</p>
        <p class="card-text"><strong>Phone:</strong> ${users.phone}</p>
        <a href="#" class="btn btn-primary"> Contact </a>
        </div>
        </div>

        `
    });

    cardContainer.innerHTML = cards;
}


fetchUsers();
