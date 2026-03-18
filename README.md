# MAKCU Documentation

Documentation site for the MAKCU device and the MAKCU Rust library.

Live version can be found here: [MAKCU Docs](https://makcu.k4tech.net)

Built with [SolidJS](https://solidjs.com) and [MidnightUI](https://github.com/user/midnightui).

## Sections

- **Native API** -- Complete firmware command reference for the MAKCU device (v3.2 / v3.7). Covers hardware, transport, connection protocol, and all `km.*` commands.
- **Rust Library** -- API reference and usage guides for the MAKCU Rust crate (in progress).

## Development

### Prerequisites

- [Bun](https://bun.sh)

### Setup

```bash
bun install
```

### Dev Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
bun run build
```

Output goes to `dist/`.

## Tech Stack

- [SolidJS](https://solidjs.com) -- Reactive UI framework
- [@solidjs/router](https://docs.solidjs.com/solid-router) -- Client-side routing
- [Vite](https://vitejs.dev) -- Build tool
- [Bun](https://bun.sh) -- Runtime and package manager
- [MidnightUI](https://github.com/user/midnightui) -- Component library
- [solid-icons](https://github.com/x64Bits/solid-icons) -- Icons
