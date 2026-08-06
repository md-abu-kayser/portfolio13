import { IncomingMessage, ServerResponse } from "http";

export const productRoute = (req: IncomingMessage, res: ServerResponse) => {
  //   console.log(req.url);
  //   console.log(req.method);

  const url = req.url;
  //   console.log("Product:", url);
  const method = req.method;

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root url" }));
  } else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "root is not found." }));
  }
};
