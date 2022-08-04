import { getOne } from "../repositories/productsRepository.mjs";

export async function getProductController(_, response, productId) {
  try {
    const product = await getOne(productId);
    
    if (product) {
      response.writeHead(200, { "Content-Type": "text/json" });
      response.end(JSON.stringify(product));
      return
    }

    response.writeHead(404, { "Content-Type": "text/json" });
    response.end(JSON.stringify({ message: "Product not found" }));
  } catch (error) {
    console.log(error);
  }
}
