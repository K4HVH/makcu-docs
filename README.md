# SolidJS + Vite + Bun

A high-performance SolidJS application scaffold using Vite for build tooling and Bun as the runtime and package manager.

## Tech Stack

- **SolidJS** - Fine-grained reactive UI framework
- **Vite** - Fast build tool with HMR
- **Bun** - Fast JavaScript runtime and package manager
- **TypeScript** - Type safety
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

Preview the production build locally:

```bash
bun run serve
```

## Testing

Run end-to-end tests with Playwright across all browsers (Chromium, Firefox, WebKit):

```bash
bun run test
```

**Note:** Use `bun run test`, not `bun test`. The latter runs Bun's built-in test runner which doesn't work with Playwright.

Run tests with UI mode for debugging:

```bash
bun run test:ui
```

Run tests in headed mode (see browser):

```bash
bun run test:headed
```

Tests are located in `tests/e2e/` and will automatically start the dev server. Test results and reports are saved in `tests/.output/` (git-ignored).

## Deployment

Deploy the `dist` folder to any static host provider (Vercel, Netlify, Cloudflare Pages, etc.)

## Learn More

- [SolidJS Documentation](https://solidjs.com)
- [Vite Documentation](https://vitejs.dev)
- [Bun Documentation](https://bun.sh)
- [Playwright Documentation](https://playwright.dev)
