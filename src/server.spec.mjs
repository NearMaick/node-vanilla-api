import { strictEqual } from "assert";

const actual = 2;
const expected = 3;

try {
  strictEqual(actual, expected);
} catch (error) {
  console.log(error);
}
