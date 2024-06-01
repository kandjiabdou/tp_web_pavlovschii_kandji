class Product {
  constructor(id = "", name = "", desc = "", price = 0) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
  }
}

class Stock {
  constructor() {
    this.list_product = [];
  }

  async fetch_products() {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      this.list_product = data.map(item => new Product(item.id, item.name, item.description, item.price));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  get_list_product() {
    return this.list_product;
  }

  get_prod_by_id(id) {
    for (var i = 0; i < this.list_product.length; i++) {
      if (this.list_product[i].id == id) {
        return this.list_product[i];
      }
    }
    return null;
  }
}

class Cart {
  constructor() {
    this.list_cart = {};
  }

  get_list_cart() {
    return this.list_cart;
  }

  addInCart(id) {
    if (this.list_cart[id]) {
      this.list_cart[id]++;
    } else {
      this.list_cart[id] = 1;
    }
  }

  removeFromCart(id) {
    if (this.list_cart[id]) {
      if (this.list_cart[id] === 1) {
        delete this.list_cart[id];
      } else {
        this.list_cart[id]--;
      }
    }
  }

  get_nbr_product() {
    return Object.values(this.list_cart).reduce((total, qty) => total + qty, 0);
  }

  get_total_price(stk) {
    return Object.entries(this.list_cart).reduce((total, [id, qty]) => {
      const product = stk.get_prod_by_id(id);
      return total + (product.price * qty);
    }, 0);
  }
}

export { Product, Stock, Cart };
