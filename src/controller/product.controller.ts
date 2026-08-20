import { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../services/product.service";
import { IProduct } from "../types/product.interface";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlPart = url?.split("/"); // '/products/151'  => ['' , 'products' , '151']
  const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;
  //   console.log(id);

  if (method === "GET" && url === "/products") {
    try {
      const products = readProduct();
      return sendResponse(
        res,
        true,
        200,
        "Products retrived successully!",
        products,
      );
    } catch (error) {
      return sendResponse(res, false, 200, "Something went wrong!!", error);
    }
  } else if (method === "GET" && id !== null) {
    try {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id === id);
      return sendResponse(
        res,
        true,
        200,
        "Products retrived successully!",
        product,
      );
    } catch (error) {
      return sendResponse(res, false, 200, "Something went wrong!!", error);
    }
  } else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);
      const products = readProduct();

      const newProduct = {
        id: Date.now(),
        ...body,
      };
      products.push(newProduct);
      writeProduct(products);
      return sendResponse(
        res,
        true,
        200,
        "Products created successfully!",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, false, 200, "Something went wrong!!", error);
    }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products not found!",
        }),
      );
      return;
    }
    products[index] = { id: products[index].id, ...body }; // [ { "id": 1, "name": "T-shirt", "color": "Red" },  ]
    writeProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products updated successfully!",
        data: products[index],
      }),
    );
    return;
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products not found!",
        }),
      );
      return;
    }

    products.splice(index, 1);
    writeProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products deleted successfully!",
      }),
    );
    return;
  }
};
