import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".ico": "image/x-icon",
};
http
  .createServer((req, res) => {
    let url;
    try {
      url = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.join(root, url);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    let status = 200;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      status = 404;
      file = path.join(root, "404.html");
    }
    let body = fs.readFileSync(file);
    const headers = {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      Vary: "Accept-Encoding",
    };
    if (url.startsWith("/_next/static/"))
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    if (
      body.length > 1024 &&
      /\bgzip\b/.test(req.headers["accept-encoding"] || "") &&
      /\.(html|js|css|svg|txt|json|xml)$/.test(file)
    ) {
      body = gzipSync(body);
      headers["Content-Encoding"] = "gzip";
    }
    res.writeHead(status, headers);
    res.end(req.method === "HEAD" ? undefined : body);
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Static export at http://127.0.0.1:${port} (gzip enabled)`),
  );
