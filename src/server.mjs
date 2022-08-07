import { createServer } from "http";
import { createProductController } from "./controllers/createProductController.mjs";
import { deleteProductController } from "./controllers/deleteProductController.mjs";
import { getProductController } from "./controllers/getProductController.mjs";
import { listProductsController } from "./controllers/listProductsController.mjs";
import { updateProductController } from "./controllers/updateProductController.mjs";

const server = createServer((request, response) => {
  try {
    switch (request.url) {
      case "/api/products":
        if (request.method === "POST")
          createProductController(request, response);

        if (request.method === "GET") listProductsController(request, response);
        break;

      case `${request.url.match(/^\/api\/products\/\d+$/)}`:
        if (request.method === "GET") {
          const productId = parseInt(request.url.split("/")[3], 10);
          getProductController(request, response, productId);
        }

        if (request.method === "PATCH") {
          const productId = parseInt(request.url.split("/")[3], 10);
          updateProductController(request, response, productId);
        }

        if (request.method === "DELETE") {
          const productId = parseInt(request.url.split("/")[3], 10);
          deleteProductController(request, response, productId);
        }
        break;

      default:
        response.writeHead(404, { "Content-Type": "text/json" });
        response.end(JSON.stringify({ message: "Not found" }));
    }
  } catch (error) {
    console.log(error);

    response.writeHead(500, { "Content-Type": "text.json" });
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
});

const PORT = process.env.PORT || 3333;

server.listen(PORT, console.log(`Server running on port ${PORT}`));
