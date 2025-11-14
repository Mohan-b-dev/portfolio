#!/usr/bin/env node

import next from "next";
import http from "http";

const app = next({ dev: false });
const handle = app.getRequestHandler();

await app.prepare();

const server = http.createServer((req, res) => {
  handle(req, res);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("[Server] Listening on http://0.0.0.0:3000");
});

server.on("error", (err) => {
  console.error("[Server] Error:", err);
});
