// // Predefined accounts
// const accounts = [
//     { username: "sherxon", password: "12345" },
//     { username: "otabek", password: "5432" },
//     { username: "user3", password: "pass3" },
//     { username: "user4", password: "pass4" },
//     { username: "user5", password: "pass5" },
//   ];
  
//   // Login validation
//   document.getElementById("login-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const user = accounts.find(
//       (acc) => acc.username === username && acc.password === password
//     );
//     if (user) {
//       document.getElementById("login-container").style.display = "none";
//       document.getElementById("dashboard").style.display = "block";
//       loadProducts(); // Load products from localStorage
//     } else {
//       alert("Invalid credentials!");
//     }
//   });
  
//   // Function to get products from localStorage
//   function getProducts() {
//     const products = localStorage.getItem("products");
//     return products ? JSON.parse(products) : [];
//   }
  
//   // Function to save products to localStorage
//   function saveProducts(products) {
//     localStorage.setItem("products", JSON.stringify(products));
//   }
  
//   // Add product
//   document.getElementById("add-btn").addEventListener("click", () => {
//     const code = document.getElementById("product-code").value;
//     const sizes = document.getElementById("product-sizes").value;
//     const quantity = document.getElementById("product-quantity").value;
//     const imageFile = document.getElementById("product-image").files[0];
  
//     if (code && sizes && quantity && imageFile) {
//       const reader = new FileReader();
//       reader.onload = function () {
//         const products = getProducts();
//         products.push({
//           code,
//           sizes,
//           quantity,
//           image: reader.result,
//         });
//         saveProducts(products);
//         alert("Product added successfully!");
//         loadProducts(); // Refresh the product display
//       };
//       reader.readAsDataURL(imageFile);
//     } else {
//       alert("Please fill all fields!");
//     }
//   });
  
//   // Search product
//   document.getElementById("search-btn").addEventListener("click", () => {
//     const searchCode = document.getElementById("search-code").value;
//     const products = getProducts();
//     const product = products.find((p) => p.code === searchCode);
  
//     const display = document.getElementById("product-display");
//     display.innerHTML = "";
  
//     if (product) {
//       const card = document.createElement("div");
//       card.classList.add("product-card");
//       card.innerHTML = `
//         <img src="${product.image}" alt="Product Image">
//         <div>
//           <h4>Code: ${product.code}</h4>
//           <p>Sizes: ${product.sizes}</p>
//           <p>Quantity per Pack: ${product.quantity}</p>
//         </div>
//       `;
//       display.appendChild(card);
//     } else {
//       display.innerHTML = "<p>No product found!</p>";
//     }
//   });
  
//   // Load all products into the display
//   function loadProducts() {
//     const products = getProducts();
//     const display = document.getElementById("product-display");
//     display.innerHTML = "";
  
//     products.forEach((product) => {
//       const card = document.createElement("div");
//       card.classList.add("product-card");
//       card.innerHTML = `
//         <img src="${product.image}" alt="Product Image">
//         <div>
//           <h4>Code: ${product.code}</h4>
//           <p>Sizes: ${product.sizes}</p>
//           <p>Quantity per Pack: ${product.quantity}</p>
//         </div>
//       `;
//       display.appendChild(card);
//     });
//   }


// Predefined accounts
const accounts = [
  { username: "shahriyor", password: "shah0300", role: "admin" },
  { username: "sardor", password: "sar2545", role: "viewer" },
  { username: "user2", password: "pass2", role: "viewer" },
  { username: "user3", password: "pass3", role: "viewer" },
  { username: "user4", password: "pass4", role: "viewer" },
  { username: "user5", password: "pass5", role: "viewer" },
];

// Persistent login check
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  toggleAdminFeatures(currentUser.role);
  loadProducts();
}

// Login validation
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = accounts.find(
    (acc) => acc.username === username && acc.password === password
  );
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    document.getElementById("login-container").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    toggleAdminFeatures(user.role);
    loadProducts();
  } else {
    alert("Invalid credentials!");
  }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.reload();
});

// Function to toggle admin features
function toggleAdminFeatures(role) {
  const addProductSection = document.getElementById("add-product");
  if (role === "admin") {
    addProductSection.style.display = "block";
  } else {
    addProductSection.style.display = "none";
  }
}

// Get products from localStorage
function getProducts() {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Add product
document.getElementById("add-btn").addEventListener("click", () => {
  const code = document.getElementById("product-code").value;
  const sizes = document.getElementById("product-sizes").value;
  const quantity = document.getElementById("product-quantity").value;
  const price = document.getElementById("product-price").value;
  const info = document.getElementById("product-info").value;
  const imageFile = document.getElementById("product-image").files[0];

  if (code && sizes && quantity && price && info && imageFile) {
    const reader = new FileReader();
    reader.onload = function () {
      const products = getProducts();
      products.push({
        id: Date.now(),
        code,
        sizes,
        quantity,
        price,
        info,
        image: reader.result,
      });
      saveProducts(products);
      alert("Product added successfully!");
      loadProducts();
    };
    reader.readAsDataURL(imageFile);
  } else {
    alert("Please fill all fields!");
  }
});

// Load products
function loadProducts() {
  const products = getProducts();
  const display = document.getElementById("product-display");
  display.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div>
        <h4>Code: ${product.code}</h4>
        <p>Sizes: ${product.sizes}</p>
        <p>Quantity per Pack: ${product.quantity}</p>
        <p>Price: $${product.price}</p>
        <p>Info: ${product.info}</p>
      </div>
    `;

    if (currentUser && currentUser.role === "admin") {
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editProduct(product.id));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteProduct(product.id));

      card.appendChild(editButton);
      card.appendChild(deleteButton);
    }

    display.appendChild(card);
  });
}

// Edit product
function editProduct(id) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  if (product) {
    document.getElementById("product-code").value = product.code;
    document.getElementById("product-sizes").value = product.sizes;
    document.getElementById("product-quantity").value = product.quantity;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-info").value = product.info;

    deleteProduct(id); // Remove the product temporarily
  }
}

// Delete product
function deleteProduct(id) {
  let products = getProducts();
  products = products.filter((p) => p.id !== id);
  saveProducts(products);
  loadProducts();
}

// Search product
document.getElementById("search-btn").addEventListener("click", () => {
  const searchCode = document.getElementById("search-code").value;
  const products = getProducts();
  const product = products.find((p) => p.code === searchCode);

  const display = document.getElementById("product-display");
  display.innerHTML = "";


  if (product) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div>
        <h4>Code: ${product.code}</h4>
        <p>Sizes: ${product.sizes}</p>
        <p>Quantity per Pack: ${product.quantity}</p>
        <p>Price: $${product.price}</p>
        <p>Info: ${product.info}</p>
      </div>
    `;
    display.appendChild(card);
  } else {
    display.innerHTML = "<p>No product found!</p>";
  }
});

document.getElementById("add-btn").addEventListener("click", () => {
  const inputs = [
    document.getElementById("product-code"),
    document.getElementById("product-sizes"),
    document.getElementById("product-quantity"),
    document.getElementById("product-price"),
    document.getElementById("product-info"),
  ];

  // Reset input fields after adding the product
  inputs.forEach((input) => (input.value = ""));
  document.getElementById("product-image").value = null;
});
