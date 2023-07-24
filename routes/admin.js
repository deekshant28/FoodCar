const express = require("express");
const path = require("path");

const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, deleteProduct } = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/admin-products",getProducts);

router.post("/add-product", postAddProduct);

router.get('/edit-product/:productId',getEditProduct);

router.post('/edit-product',postEditProduct);

router.post('/delete-product',deleteProduct);

module.exports = router;
