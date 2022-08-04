import products from "../data/products.json" assert { "type": "json" }

export async function listProductsRepository() {
  return Promise.resolve(products)
}
