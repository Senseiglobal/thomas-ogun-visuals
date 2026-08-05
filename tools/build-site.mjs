import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist");

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of fs.readdirSync(projectRoot, { withFileTypes: true })) {
  if ([".git", "dist", "node_modules", "artifacts"].includes(entry.name)) continue;
  fs.cpSync(
    path.join(projectRoot, entry.name),
    path.join(outputDir, entry.name),
    { recursive: true },
  );
}

console.log(`Built static portfolio to ${outputDir}`);
