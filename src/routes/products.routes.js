import { createProductController } from "../controllers/createProductController.js";
import { deleteProductController } from "../controllers/deleteProductController.js";
import { getProductController } from "../controllers/getProductController.js";
import { listProductsController } from "../controllers/listProductsController.js";
import { updateProductController } from "../controllers/updateProductController.js";

const API_PRODUCTS = "/api/products";
const API_PRODUCTS_UUID =
  /^\/api\/products\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

export async function productsRoutes(request, response) {
  switch (request.url) {
    case API_PRODUCTS:
      if (request.method === "POST") {
        await createProductController(request, response);
        return true;
      }

      if (request.method === "GET") {
        await listProductsController(request, response);
        return true;
      }
      break;

    case `${request.url.match(API_PRODUCTS_UUID)}`:
      if (request.method === "GET") {
        const productId = request.url.split("/")[3];
        await getProductController(request, response, productId);
        return true;
      }

      if (request.method === "PATCH") {
        const productId = request.url.split("/")[3];
        await updateProductController(request, response, productId);
        return true;
      }

      if (request.method === "DELETE") {
        const productId = request.url.split("/")[3];
        await deleteProductController(request, response, productId);
        return true;
      }
      break;

    default:
      return false;
  }
}
