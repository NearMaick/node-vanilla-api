import products from "../data/products.json" assert { "type": "json" };
import { writeJsonToFile } from "../utils/writeJsonToFile.js";

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
      ...product,
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

export function update(product) {
  return new Promise((resolve) => {
    const index = products.findIndex((p) => p.id === product.id);
    products[index] = product;
    writeJsonToFile("./src/data/products.json", products);
    resolve(product);
  });
}

export function deleteProduct(productId) {
  return new Promise((resolve) => {
    const productsWithoutDeleted = products.filter(
      (product) => product.id !== productId
    );
    writeJsonToFile("./src/data/products.json", productsWithoutDeleted);
    resolve(null);
  });
}
