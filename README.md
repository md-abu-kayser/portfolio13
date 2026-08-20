# Bare-Metal Node.js Server

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-native_HTTP-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

A lightweight, dependency-free product REST API built directly on Node.js's native `http` module and TypeScript. This project demonstrates how to design a clean HTTP request flow, parse JSON bodies, implement CRUD operations, and persist data without Express or a database server.

It is intentionally small, transparent, and easy to extend: every request passes through an explicit route, controller, service, and utility layer.

## Why This Project

This server is a practical exercise in understanding the foundations that frameworks normally abstract away:

- Native HTTP server creation with Node.js
- Explicit method and URL routing
- TypeScript domain modeling
- Asynchronous request-body parsing
- Consistent JSON responses
- File-based persistence with a local JSON datastore
- A development workflow powered by `tsx watch`

## Features

- Full product CRUD operations
- REST-style endpoints under `/products`
- Automatic product ID generation with `Date.now()`
- JSON request and response handling
- Simple layered architecture with focused responsibilities
- No runtime framework or external database dependency
- Ready-to-use `.http` request example for VS Code REST clients

## Technology Stack

| Layer              | Technology                              |
| ------------------ | --------------------------------------- |
| Runtime            | Node.js                                 |
| Language           | TypeScript                              |
| HTTP               | Node.js native `http` module            |
| Development runner | `tsx`                                   |
| Persistence        | Local JSON file and Node.js `fs` module |
| Module resolution  | TypeScript bundler resolution           |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer

### Installation

```bash
git clone https://github.com/md-abu-kayser/bare-metal-nodejs-server.git
cd bare-metal-nodejs-server
npm install
```

### Run the development server

```bash
npm run dev
```

The API starts at [http://localhost:5000](http://localhost:5000). The development process watches the TypeScript source and restarts when files change.

### Verify the project

```bash
npx tsc --noEmit
```

## API Reference

### Product model

```json
{
  "id": 2,
  "name": "T-shirt",
  "color": "Green"
}
```

| Method   | Endpoint        | Description                            |
| -------- | --------------- | -------------------------------------- |
| `GET`    | `/`             | Returns the server welcome response    |
| `GET`    | `/products`     | Returns all products                   |
| `GET`    | `/products/:id` | Returns one product by numeric ID      |
| `POST`   | `/products`     | Creates a product and generates its ID |
| `PUT`    | `/products/:id` | Replaces an existing product           |
| `DELETE` | `/products/:id` | Deletes an existing product            |

### Create a product

```bash
curl -X POST http://localhost:5000/products \
	-H "Content-Type: application/json" \
	-d '{"name":"Mechanical Keyboard","color":"Black"}'
```

Example response:

```json
{
  "succes": true,
  "message": "Products created successfully!",
  "data": {
    "id": 1764348344663,
    "name": "Mechanical Keyboard",
    "color": "Black"
  }
}
```

### Read products

```bash
curl http://localhost:5000/products
curl http://localhost:5000/products/2
```

Successful reads use the following response shape:

```json
{
  "succes": true,
  "message": "Products retrived successully!",
  "data": []
}
```

### Update a product

```bash
curl -X PUT http://localhost:5000/products/2 \
	-H "Content-Type: application/json" \
	-d '{"name":"Premium T-shirt","color":"Navy"}'
```

`PUT` replaces the product fields while preserving the existing `id`.

### Delete a product

```bash
curl -X DELETE http://localhost:5000/products/2
```

The repository also includes a ready-to-run request in [`src/http/product.post.http`](src/http/product.post.http) for the VS Code REST Client extension.

## Architecture

```text
HTTP request
		|
		v
src/server.ts
		|
		v
src/routes/product.route.ts
		|
		v
src/controller/product.controller.ts
		|                 |
		v                 v
src/utility/      src/services/
parseBody.ts      product.service.ts
sendResponse.ts        |
											 v
							src/database/database.json
```

| Directory        | Responsibility                                            |
| ---------------- | --------------------------------------------------------- |
| `src/server.ts`  | Creates the native HTTP server and listens on port `5000` |
| `src/routes`     | Matches request URLs and methods                          |
| `src/controller` | Coordinates CRUD behavior and HTTP responses              |
| `src/services`   | Reads and writes product data                             |
| `src/types`      | Defines the product contract                              |
| `src/utility`    | Provides body parsing and response helpers                |
| `src/database`   | Stores the local product collection                       |

## Persistence Notes

Products are stored in [`src/database/database.json`](src/database/database.json). This makes the project convenient for learning, demos, and small prototypes, while keeping the data visible and inspectable.

For production workloads, replace the file service with a database-backed repository. A database would provide concurrency control, validation, indexing, transactions, and durable operational backups that synchronous JSON file writes do not provide.

## Design Considerations

This project favors explicitness over framework convenience. That makes the request lifecycle easy to study, but it also leaves several production concerns intentionally open for future iterations:

- Request schema validation
- Centralized 404 and error handling
- Authentication and authorization
- CORS and security headers
- Structured logging
- Automated unit and integration tests
- Environment-based configuration for the port and datastore
- A database repository for concurrent writes

These boundaries make the repository a useful foundation for incrementally evolving a bare-metal HTTP service into a production-grade API.

## Available Commands

| Command            | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Starts the server with file watching              |
| `npx tsc --noEmit` | Type-checks the project without generating output |

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact and Maintainer

- **Name:** Md Abu Kayser
- **Project:** _bare-metal-nodejs-server_
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)
- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)

## Author

Built by [Md Abu Kayser](https://github.com/md-abu-kayser).
