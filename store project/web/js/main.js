window.addEventListener("load", () => {
 
  //load_users()
  load_products();
   fetchUsers();
});

function load_products() {
  fetch("http://localhost:4242/api/products/")
    .then((response) => response.json())
    .then((data) => {
      const productsContainer = document.querySelector(".products");

      // Clear the existing products before loading the new ones
      productsContainer.innerHTML = "";

      let userId = null;
      // Retrieve the user ID from local storage
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
          userId = user.id;
      } 
      // Loop through the product data and create the corresponding HTML elements
      data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("div");
        img.classList.add("img");
        img.innerHTML = `<img src="${product.img}" alt="">`;
        card.appendChild(img);

        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.textContent = product.descricao;
        card.appendChild(desc);

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = product.nome;
        card.appendChild(title);

        const box = document.createElement("div");
        box.classList.add("box");

        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = ` ${product.preco} EUR`;
        box.appendChild(price);

        const buyBtn = document.createElement("button");
        buyBtn.classList.add("btn");
        buyBtn.textContent = "Add";
        buyBtn.addEventListener("click", () => {
          if (user) {
            addToCart(userId, product.id); 
          } 
        });
        box.appendChild(buyBtn);

        card.appendChild(box);

        productsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}

function addToCart(userId, productId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }
  const cartItem = { user_id: userId, product_id: productId };

  fetch("http://localhost:4242/api/cart-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      
    },
    body: JSON.stringify(cartItem),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Added to cart:", data);
      // Handle success response if needed
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
      // Handle error response if needed
    });
}
function fetchUsers() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }
  fetch("http://localhost:4242/api/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }})
    .then((response) => response.json())
    .then((users) => {
      createTableElements(users);
    })
    .catch((error) => {
      console.error("Erro ao buscar os utilizadores:", error);
    });
}

function createTableElements(users) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("user-table");

  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const usernameHeader = document.createElement("th");
  usernameHeader.textContent = "Username";
  headerRow.appendChild(usernameHeader);

  const idHeader = document.createElement("th");
  idHeader.textContent = "ID";
  headerRow.appendChild(idHeader);

  const roleHeader = document.createElement("th");
  roleHeader.textContent = "Role";
  headerRow.appendChild(roleHeader);

  const actionsHeader = document.createElement("th");
  actionsHeader.textContent = "Actions";
  headerRow.appendChild(actionsHeader);

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");

  users.forEach((user) => {
    const row = document.createElement("tr");

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    const idCell = document.createElement("td");
    idCell.textContent = user.id;
    row.appendChild(idCell);

    const roleCell = document.createElement("td");
    roleCell.textContent = user.role == 1 ? "Administrador" : "Normal User";
    row.appendChild(roleCell);

    const actionsCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
      deleteUser(user.id); // Chame a função para remover o utilizador com o ID correspondente
    });
    actionsCell.appendChild(removeButton);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  userList.appendChild(table);

  const addButton = document.createElement("button");
  addButton.textContent = "Add an Administrator";
  addButton.classList.add("add-button");
  addButton.addEventListener("click", () => {
    window.location.href = "register.html"; // Redirecionar para a página register.html
  });
  userList.appendChild(addButton);
}


function deleteUser(userId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }
  fetch(`http://localhost:4242/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Utilizador removido com sucesso:", data);
      fetchUsers(); // Chame a função para buscar os utilizadores novamente e atualizar a exibição
    })
    .catch((error) => {
      console.error("Erro ao remover o utilizador:", error);
    });
}





  window.addEventListener('load', function() {
    
    const token = localStorage.getItem("token-iusabndkjanbksd");
  
    const profile = localStorage.getItem('profile');

    if (token && profile) {
      const parsedProfile = JSON.parse(profile);
      const isAdmin = parsedProfile.role === "1";

      document.getElementById('register-buton').style.display = 'none';
      document.getElementById('login-buton').style.display = 'none';
      document.getElementById('logaut-buton').style.display = 'block';
      document.getElementById('admin-buton').style.display = isAdmin ? 'block' : 'none';
    } else {
      document.getElementById('register-buton').style.display = 'block';
      document.getElementById('login-buton').style.display = 'block';
      document.getElementById('logaut-buton').style.display = 'none';
      document.getElementById('admin-buton').style.display = 'none';
    }
  });



function logout() {
  localStorage.removeItem("token-iusabndkjanbksd");
  localStorage.removeItem("profile");
  window.location.reload();
}