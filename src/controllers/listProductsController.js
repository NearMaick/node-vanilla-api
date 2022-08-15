import { list } from "../repositories/productsRepository.js";

export async function listProductsController(_, response) {
  try {
    const products = await list();
    response.writeHead(200, {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    });
    response.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
