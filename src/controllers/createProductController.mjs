import { create } from "../repositories/productsRepository.mjs";

export async function createProductController(_, response) {
  console.log("chamou")
  try {
    const newProduct = {
      id: 999,
      name: "Product 999",
      price: 99,
      description: "This is product 999",
      image: "https://picsum.photos/200/300",
      quantity: 1,
      total: 10,
    };
  
    const product = await create(newProduct)
  
    response.writeHead(201, {
      "Content-Type": "text/json",
      Location: `/api/products/${product.id}`,
    });
    
    response.end(JSON.stringify(product));
  } catch (error) {
    console.log(error)
  }
}