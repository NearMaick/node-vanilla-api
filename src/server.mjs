import { createServer } from "http";
import { productsRoutes } from "./routes/products.routes.mjs";

const server = createServer(async (request, response) => {
  const isRoute = await productsRoutes(request, response);

  try {
    if (!isRoute) {
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
