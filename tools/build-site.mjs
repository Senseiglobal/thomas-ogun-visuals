import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist");
const excludedFiles = new Set([
  "assets/exhibition/identity-spirituality/process/the-gods-eyes-process.mp4",
]);

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of fs.readdirSync(projectRoot, { withFileTypes: true })) {
  if ([".git", "dist", "node_modules", "artifacts"].includes(entry.name)) continue;
  fs.cpSync(
    path.join(projectRoot, entry.name),
    path.join(outputDir, entry.name),
    {
      recursive: true,
      filter(source) {
        const relative = path.relative(projectRoot, source).split(path.sep).join("/");
        return !excludedFiles.has(relative);
      },
    },
  );
}

console.log(`Built static portfolio to ${outputDir}`);
