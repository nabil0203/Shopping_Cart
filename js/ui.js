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
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-4 rounded">
        <h3 class="text-lg font-bold">${product.name}</h3>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-600 font-bold my-2">$${product.price.toFixed(2)}</p>
        <button onclick="Cart.addItem(${product.id})"
          class="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      `;

      productList.appendChild(div);
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
            onchange="Cart.updateQuantity(${item.id}, this.value)" 
            class="w-16 border rounded px-2 py-1">
          <button onclick="Cart.removeItem(${item.id})"
            class="text-red-600 hover:underline">Remove</button>
        </div>
      `;

      cartItemsDiv.appendChild(div);
    });
  },

  checkout() {
    if (Cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Checkout successful!\nTotal: $${Cart.getTotal().toFixed(2)}`);
    Cart.clearCart();
  }
};

window.onload = () => UI.init();
