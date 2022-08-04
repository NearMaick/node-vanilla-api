const products = require("../data/products.json")

async function listProductsRepository() {
  return Promise.resolve(products)
}

module.exports = {
  listProductsRepository
}