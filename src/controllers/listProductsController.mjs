import { listProductsRepository } from "../repositories/productsRepository.mjs";

export async function listProducts(_, response) {
  try {
    const products = await listProductsRepository();
    response.writeHead(200, { "Content-Type": "text/json" });
    response.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
