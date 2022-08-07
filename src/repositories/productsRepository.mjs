import products from "../data/products.json" assert { "type": "json" };
import { writeJsonToFile } from "../utils/writeJsonToFile.mjs";

export function list() {
  return Promise.resolve(products);
}

export function getOne(productId) {
  return Promise.resolve(products.find((product) => product.id === productId));
}

export function create(product) {
  return new Promise((resolve) => {
    const { name, price, description, image, quantity, total } = product;
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      image,
      quantity,
      total,
    };

    products.push(newProduct);
    writeJsonToFile("./src/data/products.json", products);
    resolve(newProduct);
  });
}
