const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  const editMode= req.query.edit;
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true, 
    editing:editMode
  });
};

exports.postAddProduct = (req, res, next) => {
  const title=req.body.title;
  const imageURL=req.body.imageURL;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null,title,imageURL,description,price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const prodId= req.params.productId;
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  Product.findById(prodId,(product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      formCSS: true,
      productCSS: true,
      editing:editMode,
      product:product
    });
  })
};

exports.postEditProduct = (request,response,next) => {
  const prodId = request.body.productId;
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedURL = request.body.imageURL;
  const updatedDescription = request.body.description;

  const updatedProduct = new Product(prodId, updatedTitle, updatedURL, updatedDescription, updatedPrice);
  updatedProduct.save();
  response.redirect('/admin/admin-products');
}

exports.getProducts = (req,res,next) => {
  Product.fetchAll( products => { //fetchAll will call this callback function once it completely executes
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin-Products",
      path: "/admin/admin-products",
      formCSS: false,
      productCSS: true,
    })
  });
};

exports.deleteProduct = (req,res,next) => {
  const prodId=req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/admin-products');
};