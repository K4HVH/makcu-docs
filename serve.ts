import { join } from "path";

const PORT = parseInt(process.env.PORT || "3000");
const PUBLIC_DIR = process.env.PUBLIC_DIR || "./dist";

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Normalize path - if ends with /, add index.html
    if (pathname.endsWith("/")) {
      pathname = join(pathname, "index.html");
    }

    let filePath = join(PUBLIC_DIR, pathname);

    // Try to serve the file
    let file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }

    // Try with .html extension
    file = Bun.file(filePath + ".html");
    if (await file.exists()) {
      return new Response(file);
    }

    // Try as directory with index.html
    file = Bun.file(join(filePath, "index.html"));
    if (await file.exists()) {
      return new Response(file);
    }

    // Fallback to root index.html for SPA routing
    return new Response(Bun.file(join(PUBLIC_DIR, "index.html")));
  },
  error() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${PORT}`);
