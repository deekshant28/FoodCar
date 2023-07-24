const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    //fetchAll will call this callback function once it completely executes
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
      formCSS: false,
      productCSS: true,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      productCSS: true,
      formCSS: false,
      path: "/product-detail",
    });
  });
};

exports.postCart = (req,res,next) => {
  const prodId=req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId , product.price);
  })
  // console.log(prodId);
  res.redirect('/cart');
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    //fetchAll will call this callback function once it completely executes
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      formCSS: false,
      productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products){
        const cartProductData= cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData : product,qty:cartProductData.qty});
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        formCSS: false,
        productCSS: true,
        prods: cartProducts
      });
    })
  })
};

exports.getOrders = (request, response, next) => {
  response.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      productCSS:true,
      formCSS:false
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    productCSS: false,
    formCSS: true,
  });
};

exports.deleteCartProduct = (req,res,next) => { 
  const prodId=req.body.productId;
  const product = Product.findById(prodId, product => {
    if(product){
      Cart.deleteProduct(prodId,product.price);
    }
    res.redirect('/cart');
  });
}