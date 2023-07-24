const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const Cart = require("./cart");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = callback => {
  fs.readFile(p,(err,fileContent) => {
    if(err){
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  })
}

module.exports = class Product {
  constructor(id,title,imageUrl,description,price) {
    this.id=id;
    this.title = title;
    this.imageUrl=imageUrl;
    this.description=description;
    this.price=price;
  }

  //in class always use => functions so that (this) never loses its meaning

  save() {
    //check if current product was added or not
    getProductsFromFile(products => {
      if(this.id){
        const productIndex=products.findIndex(prod => prod.id===this.id);
        const updatedProducts = [...products];
        updatedProducts[productIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    })
    
  }

  static fetchAll(cb) { //cb is a callback function then bcoz of this code being asynchronous and this doesn't itself return anything
    getProductsFromFile(cb);
  }

  static findById(id,cb) {//cb is callback
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const product=products.find(prod => prod.id===id);
      const updatedProducts=products.filter(prod => prod.id!==id);
      fs.writeFile(p,JSON.stringify(updatedProducts),(err) => {
        if(!err){
          Cart.deleteProduct(id,product.price);
        }
      })
    })
  }
};
