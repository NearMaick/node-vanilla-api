import products from "../data/products.json" assert { "type": "json" };
import { writeJsonToFile } from "../utils/writeJsonToFile.mjs";

export function list() {
  return Promise.resolve(products)
}

export function getOne(productId) {
  return Promise.resolve(products.find( product => product.id === productId))
}

export function create(product) {
  console.log(product)
  return new Promise(resolve => {
    products.push(product);
    writeJsonToFile("./src/data/products.json", products);
    resolve(product)
  })
}
