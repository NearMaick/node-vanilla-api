import { createServer } from "http";
import { createProductController } from "./controllers/createProductController.mjs";
import { getProductController } from "./controllers/getProductController.mjs";
import { listProductsController } from "./controllers/listProductsController.mjs";

const server = createServer((request, response) => {
  switch (request.url) {
    case "/api/products":
      if (request.method === "POST")
        createProductController(request, response)

      if (request.method === "GET")
        listProductsController(request, response)
    break;

    case `${request.url.match(/^\/api\/products\/\d+$/)}`:
      if(request.method === "GET") {
        const productId = parseInt(request.url.split("/")[3], 10)
      getProductController(request, response, productId)
      }
    break;
    
    default:
      response.writeHead(404, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ message: "Not found" }));
  }
})

const PORT = process.env.PORT || 3333;

server.listen(PORT, (console.log(`Server running on port ${PORT}`)))