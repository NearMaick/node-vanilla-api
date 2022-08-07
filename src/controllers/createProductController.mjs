import { create } from "../repositories/productsRepository.mjs";
import { getJsonBody } from "../utils/getJsonBody.mjs";

export async function createProductController(request, response) {
  try {
    const body = await getJsonBody(request);
    const product = await create(body);

    response.writeHead(201, {
      "Content-Type": "text/json",
      Location: `/api/products/${product.id}`,
    });

    response.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}
