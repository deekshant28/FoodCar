const express = require("express");
const path = require("path");
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getProduct,
  postCart,
  getOrders,
  deleteCartProduct,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

router.post("/cart-delete-item",deleteCartProduct);

module.exports = router;
