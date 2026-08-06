import { IncomingMessage, ServerResponse } from "http";

export const productRoute = (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url);
};
