import { createServer } from "http";
import { listProducts } from "./controllers/listProductsController.mjs";

const server = createServer((request, response) => {
  switch (request.url) {
    case "/api/products":
      listProducts(request, response)
    break;
    default:
      response.writeHead(404, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ message: "Not found" }));
  }
})

const PORT = process.env.PORT || 3333;

server.listen(PORT, (console.log(`Server running on port ${PORT}`)))