// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  let product = null;

  // get a product by ID
  const data = productsList.find((i) => i.id === productId);
  if (!data) {
    return done("Requested product doesn't exist..!", JSON.stringify(product));
  }
  product = data;
  return done(null, JSON.stringify(product));
};

const saveProduct = (newProduct, done) => {
  // save a product
  const id = productsList.find((i) => i.id === newProduct.id);
  if (!id) {
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }
  return done("Product already exists..!", JSON.stringify(productsList));
};

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  let productFound = false;

  lodash.forEach(productsList, (obj, index) => {
    if (obj.id === productId) {
      productsList[index] = lodash.assign(obj, updateData);
      updatedProductList = productsList;
      productFound = true;
      return false; // Exit the loop after finding the matching product
    }
  });

  if (productFound) {
    done(null, JSON.stringify(updatedProductList));
  } else {
    done(
      "Requested product doesn't exist!",
      JSON.stringify(updatedProductList)
    );
  }
};

const deleteProduct = (productId, done) => {
  // delete a product
  const i = lodash.find(productsList, { id: productId });
  if (!i) {
    done("Requested product doesn't exist..!", JSON.stringify(productsList));
  }
  lodash.remove(productsList, (obj) => obj.id === productId);
  done(null, JSON.stringify(productsList));
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
