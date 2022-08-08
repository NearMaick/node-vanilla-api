import { writeFileSync } from "node:fs";

export function writeJsonToFile(file, json) {
  writeFileSync(file, JSON.stringify(json), "utf8");
}
