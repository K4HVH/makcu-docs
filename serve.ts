import { join } from "path";

const PORT = parseInt(process.env.PORT || "3000");
const PUBLIC_DIR = process.env.PUBLIC_DIR || "./dist";
const API_BASE_URL = process.env.API_BASE_URL;

const runtimeConfigScript = API_BASE_URL
  ? `<script>window.__RUNTIME_CONFIG__ = ${JSON.stringify({ apiBaseUrl: API_BASE_URL })};</script>`
  : '';

async function serveHtml(path: string): Promise<Response> {
  const file = Bun.file(path);
  const html = await file.text();
  const injected = runtimeConfigScript
    ? html.replace('</head>', `${runtimeConfigScript}</head>`)
    : html;
  return new Response(injected, { headers: { 'Content-Type': 'text/html' } });
}

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

    // Try to serve the file (non-HTML files served directly)
    let file = Bun.file(filePath);
    if (await file.exists()) {
      if (filePath.endsWith(".html")) return serveHtml(filePath);
      return new Response(file);
    }

    // Try with .html extension
    file = Bun.file(filePath + ".html");
    if (await file.exists()) {
      return serveHtml(filePath + ".html");
    }

    // Try as directory with index.html
    const dirIndex = join(filePath, "index.html");
    file = Bun.file(dirIndex);
    if (await file.exists()) {
      return serveHtml(dirIndex);
    }

    // Fallback to root index.html for SPA routing
    return serveHtml(join(PUBLIC_DIR, "index.html"));
  },
  error() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${PORT}`);
