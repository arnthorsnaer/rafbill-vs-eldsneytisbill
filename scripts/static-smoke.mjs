import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const mime = { ".html": "text/html; charset=utf-8", ".json": "application/json; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".md": "text/markdown; charset=utf-8" };
const server = createServer(async (request, response) => {
  const pathname = request.url === "/" ? "/index.html" : new URL(request.url, "http://localhost").pathname;
  const file = resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) return response.writeHead(403).end();
  try {
    response.writeHead(200, { "content-type": mime[extname(file)] ?? "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
try {
  const { port } = server.address();
  const page = await (await fetch(`http://127.0.0.1:${port}/`)).text();
  const defaults = await (await fetch(`http://127.0.0.1:${port}/data/defaults.json`)).json();
  for (const required of ["Kostnaður á 100 km", "1.000 kr.", "Fyrstu fimm árin", "Til endaloka: kostnaðarsviðsmynd"]) {
    if (!page.includes(required)) throw new Error(`Missing MVP section: ${required}`);
  }
  if (defaults.homeChargingKrPerKwh !== 25.76) throw new Error("Defaults were not served.");
  console.log("Static smoke check passed.");
} finally {
  await new Promise(resolve => server.close(resolve));
}
