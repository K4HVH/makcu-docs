# SolidJS + Vite + Bun

A high-performance SolidJS application scaffold using Vite for build tooling and Bun as the runtime and package manager.

## Tech Stack

- **SolidJS** - Fine-grained reactive UI framework
- **@solidjs/router** - Client-side routing
- **Vite** - Fast build tool with HMR
- **Bun** - Fast JavaScript runtime and package manager
- **TypeScript** - Type safety
- **Vitest** - Unit/component testing
- **Playwright** - End-to-end testing

## Getting Started

### Install Dependencies

```bash
bun install
```

### Install Playwright Browsers

Install browsers for end-to-end testing:

```bash
bunx playwright install chromium firefox webkit
```

### Development

Runs the app in development mode with hot module replacement:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

Builds the app for production to the `dist` folder:

```bash
bun run build
```

The build is minified and optimized for best performance.

### Preview Production Build

Preview the production build locally with Vite's preview server:

```bash
bun run serve
```

Or use the native Bun server (same as Docker):

```bash
bun run serve:prod
```

## Project Structure

```
src/
├── index.html              # HTML entry point
├── index.tsx              # JavaScript entry point
└── app/
    ├── App.tsx            # Router setup
    ├── Comp.tsx           # Example component
    └── pages/             # Route pages
        ├── Home.tsx       # Home page (/)
        ├── About.tsx      # About page (/about)
        └── NotFound.tsx   # 404 page
```

## Routing

The app uses `@solidjs/router` for client-side routing. Routes are defined in `src/app/App.tsx`:

```tsx
<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="*" component={NotFound} />
</Router>
```

Add new routes by creating page components in `src/app/pages/` and adding them to the Router.

Navigate between pages using the `<A>` component:

```tsx
import { A } from '@solidjs/router';

<A href="/about">Go to About</A>
```

## Testing

### Run All Tests

Run both unit and e2e tests:

```bash
bun run test
```

**Note:** Use `bun run test`, not `bun test`. The latter runs Bun's built-in test runner.

### Unit Tests (Vitest)

Run unit tests:

```bash
bun run test:unit
```

Watch mode for development:

```bash
bun run test:unit:watch
```

UI mode for debugging:

```bash
bun run test:unit:ui
```

Unit tests are located in `tests/unit/` and use Vitest with SolidJS Testing Library.

### E2E Tests (Playwright)

Run e2e tests across all browsers (Chromium, Firefox, WebKit):

```bash
bun run test:e2e
```

UI mode for debugging:

```bash
bun run test:e2e:ui
```

Headed mode (see browser):

```bash
bun run test:e2e:headed
```

E2E tests are located in `tests/e2e/` and automatically start the dev server. Test results and reports are saved in `tests/.output/` (git-ignored).

## Docker

The Docker image uses **native Bun** to serve static files (no nginx or extra dependencies needed). The production server is defined in `serve.ts`.

### Building Locally

Build for your current architecture:

```bash
docker build -t homepage-v2 .
```

Run the container:

```bash
docker run -p 3000:3000 homepage-v2
```

### Multi-Architecture Builds

The project supports native multi-arch builds (amd64 and arm64) without QEMU for optimal performance.

**✅ ARM64 builds work out of the box for public repositories!**

As of January 2025, GitHub provides free ARM64 runners (`ubuntu-24.04-arm`) for public repos. The workflow is already configured correctly.

**For private repositories:**
- Requires GitHub Team/Enterprise plan, OR
- Use a self-hosted ARM64 runner, OR
- Remove the arm64 matrix entry to build amd64 only

### CI/CD Pipeline

The GitHub Actions workflow:
1. Runs tests on every push/PR
2. Builds Docker images natively for each architecture (amd64, arm64)
3. Pushes images to GitHub Container Registry (ghcr.io)
4. Creates multi-arch manifest with tags:
   - `latest` (main branch only)
   - `main` (main branch)
   - `sha-<commit>` (short commit hash)
   - `v1.2.3` (semver tags)

Pull the image:

```bash
docker pull ghcr.io/<your-username>/homepage-v2:latest
```

## Deployment

Deploy the `dist` folder to any static host provider (Vercel, Netlify, Cloudflare Pages, etc.)

## Learn More

- [SolidJS Documentation](https://solidjs.com)
- [SolidJS Router Documentation](https://docs.solidjs.com/solid-router)
- [Vite Documentation](https://vitejs.dev)
- [Bun Documentation](https://bun.sh)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
