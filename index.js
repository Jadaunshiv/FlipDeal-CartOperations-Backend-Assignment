const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

/*---------------------------------------------------*/
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
/*---------------------------------------------------*/

// Endpoint 1

function addItemsInCart(productId, name, price, quantity) {
  let newItems = { productId, name, price, quantity };
  cart.push(newItems);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItemsInCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

// Endpoint 2

function editItemsInCart(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editItemsInCart(productId, quantity);
  res.json({ cartItems: result });
});

// Endpoint 3

function deleteItemsFromCart(cart, productId) {
  return cart.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItemsFromCart(cart, productId));
  res.json({ cartItems: result });
});

// Endpoint 4

app.get('/cart', (req, res) => {
  let result = cart;
  res.json({ cartItems: result });
});

// Endpoint 5

function calculateCartTotalQty() {
  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }
  return totalItems;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateCartTotalQty();
  res.json({ totalQuantity: result });
});

// Endpoint 6

function calculateTotalCartPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalCartPrice();
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
