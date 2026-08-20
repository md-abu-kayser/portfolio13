import { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  succes: boolean,
  statusCode: number,
  message?: string,
  data?: any
) => {
  const response = {
    succes: succes,
    message: message,
    data: data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
