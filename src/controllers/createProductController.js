import { create } from "../repositories/productsRepository.js";
import { getJsonBody } from "../utils/getJsonBody.js";

export async function createProductController(request, response) {
  try {
    const { name, price, description, image, quantity, total } =
      await getJsonBody(request);
    const product = await create({
      name,
      price,
      description,
      image,
      quantity,
      total,
    });

    response.writeHead(201, {
      "Content-Type": "text/json",
      Location: `/api/products/${product.id}`,
    });

    response.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}
