import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist");
const excludedFiles = new Set([
  "assets/exhibition/identity-spirituality/process/the-gods-eyes-process.mp4",
  "assets/images/aura-manager-hero.png",
  "assets/images/aura-manager-thomas-desktop.png",
  "assets/images/home/identity-spirituality-banner.png",
  "assets/images/identity-spirituality-banner.png",
  "assets/images/thomas-ogun-portrait-hero.png",
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
        if (excludedFiles.has(relative)) return false;
        if (relative.startsWith("assets/artwork/")) return false;
        if (relative.startsWith("assets/images/omo-campaign/") && relative.endsWith(".png")) return false;
        if (relative.startsWith("documents/artist-application-package/")) return false;
        return true;
      },
    },
  );
}

console.log(`Built static portfolio to ${outputDir}`);
