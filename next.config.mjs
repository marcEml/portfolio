import path from "node:path";
import { fileURLToPath } from "node:url";

// Keep Next.js scoped to this project even when another lockfile exists higher in the tree.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    qualities: [75, 92],
  },
};

export default nextConfig;
