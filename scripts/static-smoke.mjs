import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve(import.meta.dirname, "..");
const mime = { ".html":"text/html; charset=utf-8", ".json":"application/json; charset=utf-8", ".md":"text/markdown; charset=utf-8" };
const server = createServer(async (req,res) => { const path = req.url === "/" ? "/index.html" : new URL(req.url,"http://localhost").pathname; const file=resolve(root, `.${path}`); if(!file.startsWith(root)) return res.writeHead(403).end(); try {res.writeHead(200,{"content-type":mime[extname(file)]??"application/octet-stream"});res.end(await readFile(file));} catch {res.writeHead(404).end();} });
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
try { const port=server.address().port, page=await (await fetch(`http://127.0.0.1:${port}/`)).text(), data=await (await fetch(`http://127.0.0.1:${port}/data/defaults.json`)).json(); for(const required of ["Kostnaður á 100 km","Hversu langt kemstu?","Fimm ár","Til endaloka"]) if(!page.includes(required)) throw new Error(`Missing section: ${required}`); if(data.vehicles.bev.name !== "Škoda Enyaq iV 80 150 kW RWD (2022)") throw new Error("Vehicle defaults missing"); if(data.scenarios.base.homeTotalKrPerKwh !== 21.87) throw new Error("Tariff default missing"); console.log("Static smoke check passed."); } finally { await new Promise(ok=>server.close(ok)); }
