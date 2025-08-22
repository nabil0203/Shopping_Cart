// cart.js
const Cart = {
  items: [],

  addItem(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = this.items.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    UI.updateCart();
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      alert("Quantity must be at least 1");
      return;
    }

    const cartItem = this.items.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
    }

    UI.updateCart();
  },

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    UI.updateCart();
  },

  clearCart() {
    this.items = [];
    UI.updateCart();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
};
