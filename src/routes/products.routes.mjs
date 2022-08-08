import { createProductController } from "../controllers/createProductController.mjs";
import { deleteProductController } from "../controllers/deleteProductController.mjs";
import { getProductController } from "../controllers/getProductController.mjs";
import { listProductsController } from "../controllers/listProductsController.mjs";
import { updateProductController } from "../controllers/updateProductController.mjs";

export async function productsRoutes(request, response) {
  switch (request.url) {
    case "/api/products":
      if (request.method === "POST") {
        await createProductController(request, response);
        return true;
      }

      if (request.method === "GET") {
        await listProductsController(request, response);
        return true;
      }
      break;

    case `${request.url.match(/^\/api\/products\/\d+$/)}`:
      if (request.method === "GET") {
        const productId = parseInt(request.url.split("/")[3], 10);
        await getProductController(request, response, productId);
        return true;
      }

      if (request.method === "PATCH") {
        const productId = parseInt(request.url.split("/")[3], 10);
        await updateProductController(request, response, productId);
        return true;
      }

      if (request.method === "DELETE") {
        const productId = parseInt(request.url.split("/")[3], 10);
        await deleteProductController(request, response, productId);
        return true;
      }
      break;

    default:
      return false;
  }
}
