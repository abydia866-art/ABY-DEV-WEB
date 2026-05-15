 const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

// AFFICHER PRODUITS
async function fetchProducts() {

    try {

        const response = await fetch("https://fakestoreapi.com/products");

        const products = await response.json();

 allProducts = products;
displayProducts(products);

    } catch(error) {
        console.log("Erreur :", error);
    }
}

// CREER PRODUITS
function displayProducts(products){

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 80)}...</p>
            <h4>${product.price} €</h4>
            <button>Ajouter au panier</button>
        `;

        const button = card.querySelector("button");

        button.addEventListener("click", () => {
            addToCart(product);
        });
searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);
});
        productsContainer.appendChild(card);
    });
}


// AJOUT PANIER
function addToCart(product){

    cart.push(product);

    saveCart();

    updateCart();
}


// AFFICHER PANIER
function updateCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <p>${item.title}</p>
            <h4>${item.price} €</h4>
            <button data-index="${index}">Supprimer</button>
        `;

        const deleteBtn = div.querySelector("button");

        deleteBtn.addEventListener("click", () => {
            removeFromCart(index);
        });

        cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = cart.length;

    totalPrice.textContent = total.toFixed(2);
}


// SUPPRIMER
function removeFromCart(index){

    cart.splice(index, 1);

    saveCart();

    updateCart();
}


// LOCAL STORAGE
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));
}


// INITIALISATION
fetchProducts();

updateCart();