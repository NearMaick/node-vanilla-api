import { list, update } from "../repositories/productsRepository.js";
import { getJsonBody } from "../utils/getJsonBody.js";

export async function updateProductController(request, response, id) {
  try {
    const targetProduct = await list(id);

    if (!targetProduct) {
      response.writeHead(404, {
        "Content-Type": "text/json",
      });
      response.end(JSON.stringify({ message: "Product not found" }));
    }

    const { name, price, description, image, quantity, total } =
      await getJsonBody(request);

    const updateProduct = await update({
      id,
      name: name ?? targetProduct.name,
      price: price ?? targetProduct.price,
      description: description ?? targetProduct.description,
      image: image ?? targetProduct.image,
      quantity: quantity ?? targetProduct.quantity,
      total: total ?? targetProduct.total,
    });

    response.writeHead(201, {
      "Content-Type": "text/json",
    });
    response.end(JSON.stringify(updateProduct));
  } catch (error) {
    console.log(error);
  }
}
