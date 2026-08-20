import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/database/database.json");

export function readProduct() {
  const data = fs.readFileSync(filePath, "utf-8");
  //   console.log(data.toString());
  return JSON.parse(data);
}

export function writeProduct(product: any) {
  fs.writeFileSync(filePath, JSON.stringify(product));
}
