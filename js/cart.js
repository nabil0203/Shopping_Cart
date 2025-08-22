const Cart = {
  items: [],
  promoApplied: false,
  discount: 0,

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
    this.resetPromo(); // reset promo code
    UI.updateCart();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },







// ----------------------------------------------------
// Live Test Extended part
// ----------------------------------------------------



  // Promo Code Functions
  applyPromo(code) {
    if (this.promoApplied) {
      alert("Promo code already applied!");
      return false;
    }

    const total = this.getTotal();
    let discount = 0;

    if (code === "ostad10") {
      discount = total * 0.10;
    } else if (code === "ostad50") {
      discount = total * 0.50;
    } else {
      return false; // invalid code
    }

    this.discount = discount;
    this.promoApplied = true;
    return true;
  },

  getTotalWithDiscount() {
    return this.getTotal() - this.discount;
  },

  resetPromo() {
    this.promoApplied = false;
    this.discount = 0;
  }
};
