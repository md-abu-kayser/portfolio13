import { createServer, Server } from "http";

const server: Server = createServer((req, res) => {
  console.log(req);
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
