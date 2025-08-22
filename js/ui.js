// ui.js
const UI = {
  init() {
    this.displayProducts();
    this.updateCart();
  },

  displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "bg-white shadow p-4 rounded-lg";

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-120 object-cover mb-4 rounded">
        <h3 class="text-lg font-bold">${product.name}</h3>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-600 font-bold my-2">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      productList.appendChild(div);
    });

    // Event delegation for "Add to Cart"
    productList.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.dataset.id);
        Cart.addItem(id);
      }
    });
  },

  updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsDiv.innerHTML = "";
    cartCount.textContent = Cart.getCount();
    cartTotal.textContent = Cart.getTotal().toFixed(2);

    if (Cart.items.length === 0) {
      cartItemsDiv.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
      return;
    }

    Cart.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "flex items-center justify-between border-b pb-2";

      div.innerHTML = `
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-gray-600">$${item.price.toFixed(2)}</p>
        </div>
        <div class="flex items-center space-x-2">
          <input type="number" min="1" value="${item.quantity}" 
            data-id="${item.id}"
            class="quantity-input w-16 border rounded px-2 py-1">
          <button class="remove-item text-red-600 hover:underline" data-id="${item.id}">
            Remove
          </button>
        </div>
      `;

      cartItemsDiv.appendChild(div);
    });

    // Quantity update & remove (delegation)
    cartItemsDiv.addEventListener("input", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const id = parseInt(e.target.dataset.id);
        const qty = parseInt(e.target.value);
        if (qty > 0) {
          Cart.updateQuantity(id, qty);
        }
      }
    });

    cartItemsDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const id = parseInt(e.target.dataset.id);
        Cart.removeItem(id);
      }
    });
  }
};

window.addEventListener("DOMContentLoaded", () => UI.init());
