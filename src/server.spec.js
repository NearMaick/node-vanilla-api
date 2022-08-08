const { server } = await import("../src/server.js");

const response = await fetch("http://localhost:3333/api/products");
const JSON = await response.json();
console.log(JSON);

// import { strictEqual } from "assert";

// const actual = 2;
// const expected = 3;

// try {
//   strictEqual(actual, expected);
// } catch (error) {
//   console.log(error);
// }
