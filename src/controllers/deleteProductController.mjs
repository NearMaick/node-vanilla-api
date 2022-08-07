import { deleteProduct, list } from "../repositories/productsRepository.mjs";

export async function deleteProductController(request, response, productId) {
  const targetProduct = await list(productId);
  if (!targetProduct) {
    response.writeHead(404, { "Content-Type": "text/json" });
    response.end(JSON.stringify({ message: "Product not found" }));
    return;
  }

  await deleteProduct(productId);

  response.writeHead(204);
  response.end();
}
