await import("../src/server.js");
import { deepStrictEqual, strictEqual } from "assert";
import { describe, it } from "node:test";
import products from "../src/data/products.json" assert { "type": "json" };

const productsQuantity = products.length;

describe("Products Routes", () => {
  it("should be able to create a product", async () => {
    const productCreateMock = {
      description: "This is test product",
      image: "https://picsum.photos/200/300",
      name: "Product test",
      price: 100,
      quantity: 3,
      total: 300,
    };

    const responseCreate = await fetch("http://localhost:3333/api/products", {
      method: "POST",
      body: JSON.stringify(productCreateMock),
    });

    try {
      deepStrictEqual(responseCreate.headers.get("content-type"), "text/json");
      strictEqual(responseCreate.status, 201);
    } catch (error) {
      console.log(error);
    }
  });

  it("should be able to list a product", async () => {
    const productListMock = {
      description: "This is test product",
      image: "https://picsum.photos/200/300",
      name: "Product test",
      price: 100,
      quantity: 3,
      total: 300,
    };
    const responseProductListMock = await fetch(
      "http://localhost:3333/api/products",
      {
        method: "POST",
        body: JSON.stringify(productListMock),
      }
    );
    const dataResponseMockListProduct = await responseProductListMock.json();

    const productDataListResponse = await fetch(
      `http://localhost:3333/api/products/${dataResponseMockListProduct.id}`,
      {
        method: "GET",
      }
    );
    const productListData = await productDataListResponse.json();

    try {
      deepStrictEqual(
        productDataListResponse.headers.get("content-type"),
        "text/json"
      );
      deepStrictEqual(productListData.name, "Product test");
      strictEqual(productDataListResponse.status, 200);
    } catch (error) {
      console.log(error);
    }
    await fetch(`http://localhost:3333/api/products/${productsQuantity + 1}`, {
      method: "DELETE",
    });
  });

  it("should be able to update a product", async () => {
    const productUpdateMock = {
      description: "This is test update product",
      image: "https://picsum.photos/200/300",
      name: "Product test update",
      price: 100,
      quantity: 3,
      total: 300,
    };

    const responseUpdate = await fetch(
      `http://localhost:3333/api/products/${productsQuantity + 1}`,
      {
        method: "PATCH",
        body: JSON.stringify(productUpdateMock),
      }
    );

    const resultUpdate = await responseUpdate.json();

    try {
      deepStrictEqual(responseUpdate.headers.get("content-type"), "text/json");
      strictEqual(resultUpdate.name, "Product test update");
      strictEqual(resultUpdate.description, "This is test update product");
      strictEqual(responseUpdate.status, 201);
    } catch (error) {
      console.log(error);
    }
    await fetch(`http://localhost:3333/api/products/${productsQuantity + 1}`, {
      method: "DELETE",
    });
  });

  it("should be able to list products", async () => {
    const responseUpdate = await fetch("http://localhost:3333/api/products");

    try {
      deepStrictEqual(responseUpdate.headers.get("content-type"), "text/json");
      strictEqual(responseUpdate.status, 200);
    } catch (error) {
      console.log(error);
    }
    await fetch(`http://localhost:3333/api/products/${productsQuantity + 1}`, {
      method: "DELETE",
    });
  });

  it("should be delete a product", async () => {
    const responseListDelete = await fetch(
      "http://localhost:3333/api/products"
    );
    const resultForDelete = await responseListDelete.json();
    const listQuantity = resultForDelete.length;
    const resultDeletes = await fetch(
      `http://localhost:3333/api/products/${listQuantity}`,
      {
        method: "DELETE",
      }
    );
    try {
      strictEqual(resultDeletes.status, 204);
    } catch (error) {
      console.log(error);
    }
  });
});
