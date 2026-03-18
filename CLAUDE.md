# CLAUDE.md

Guidance for Claude Code when working in this repository. This is the **MAKCU documentation site**, built with SolidJS and MidnightUI components.

## What This Project Is

A static documentation site for the MAKCU device. Two sections:

- **Native API** -- Firmware command reference for the MAKCU hardware (v3.2 left chip / v3.7 right chip). Covers hardware, transport, connection, protocol, and all `km.*` commands.
- **Rust Library** -- Documentation for the MAKCU Rust library (in progress, currently a placeholder).

The site uses **MidnightUI** as its component library. MidnightUI components live in `src/components/` and `src/styles/` and are synced from an upstream repo. Do not modify MidnightUI component source files.

## Tech Stack

- **SolidJS** + **@solidjs/router** -- UI framework and client-side routing
- **Vite** -- Build tool (root set to `src/`)
- **Bun** -- Runtime and package manager
- **TypeScript**
- **MidnightUI** -- Component library (Card, Tabs, Pane, Titlebar, CommandPalette, etc.)
- **solid-icons** (`solid-icons/bs`) -- Bootstrap icons

## Commands

```bash
bun run dev          # Dev server (http://localhost:3000)
bun run build        # Production build (output: dist/)
bun run serve        # Preview production build
```

## Project Structure

```
src/
  index.html                          # HTML entry point
  index.tsx                           # App bootstrap
  app/
    App.tsx                           # Router setup (all routes defined here)
    searchIndex.ts                    # Curated search index for Ctrl+K search
    pages/
      Home.tsx                        # Landing page
      DocsLayout.tsx                  # Docs layout (sidebar, titlebar, search)
      native/
        Introduction.tsx              # Native API overview
        Hardware.tsx                  # USB ports, LEDs, constraints
        Transport.tsx                 # Serial interface, baud, USB IDs
        Connection.tsx                # Connection sequence, baud change frame
        Protocol.tsx                  # Request/response format
        BrokenCommands.tsx            # Non-functional commands
        Notes.tsx                     # Behaviour notes
        commands/
          Version.tsx                 # km.version()
          Buttons.tsx                 # km.left/right/middle/ms1/ms2
          Movement.tsx                # km.move(), km.silent()
          Wheel.tsx                   # km.wheel()
          Locks.tsx                   # km.lock_mx/my/ml/mr/mm/ms1/ms2
          Stream.tsx                  # km.buttons() event stream
          Serial.tsx                  # km.serial() (non-functional)
      library/
        LibraryPlaceholder.tsx        # Placeholder page
  components/                         # MidnightUI components (DO NOT MODIFY)
  styles/
    global.css                        # MidnightUI theme tokens (DO NOT MODIFY)
    docs.css                          # Documentation-specific styles
    components/                       # MidnightUI component styles (DO NOT MODIFY)
```

## Key Architecture

### Routing

All routes are defined in `App.tsx`. `DocsLayout` is the layout component for all docs pages -- it provides the sidebar, titlebar, and search. The landing page (`Home.tsx`) is outside the docs layout.

Bad URLs redirect to `/` via a catch-all route.

### Search System

The site has Ctrl+K search powered by MidnightUI's `CommandPalette` component. The search index is a **curated list** in `src/app/searchIndex.ts`.

**When adding or modifying documentation pages, you MUST update the search index.** Each entry has:
- `label` -- What the user sees in search results
- `description` -- Subtitle shown below the label
- `path` -- Route path, optionally with a `#hash` anchor (e.g. `/native/commands/buttons#set-state`)
- `group` -- Groups results in the palette
- `keywords` -- Additional terms that make the entry findable
- `icon` / `tags` -- Optional visual indicators

Entries should exist for:
- Every page (top-level entry)
- Every Card/section within a page (with `#hash` anchor)
- Every individual `km.*` command
- Every broken/silent command
- Important concepts (bitmask, baud rate, USB IDs, etc.)

### Scroll Targets

Every Card on every page is wrapped in a `<div id="..." data-search-target>`. This enables search results to scroll directly to the relevant section and highlight it. The `data-search-target` attribute provides `scroll-margin-top` to account for the sticky titlebar.

**When adding new Cards, always wrap them in a div with an `id` and `data-search-target`:**
```tsx
<div id="my-section" data-search-target>
  <Card>
    <CardHeader title="My Section" />
    ...
  </Card>
</div>
```

### Sidebar Navigation

Sidebar tabs are defined as arrays in `DocsLayout.tsx` (`nativeOverviewTabs`, `nativeCommandTabs`, `nativeReferenceTabs`, `libraryTabOptions`). When adding a new page, add it to the appropriate tab array.

## Styling Rules

- Use MidnightUI components (Card, CardHeader, Divider, etc.) for all layout. Do not write custom CSS unless required.
- Documentation-specific styles go in `src/styles/docs.css` (callouts, API badges, tables, etc.)
- Do not modify `global.css` or any files under `src/components/` or `src/styles/components/` -- these are MidnightUI upstream files.
- No emojis anywhere.
- Professional, concise wording. No filler phrases.

### Documentation Page Patterns

All documentation pages follow consistent patterns:

- **Cards** for every section. First card is the page header (title + subtitle via `CardHeader`).
- **`api-signature`** class on `<pre>` for command signatures.
- **`api-response-label`** divs for section labels (Response Type, Parameters, Example, etc.)
- **`api-badge`** spans for response type badges (EXECUTED, RESPONDED, SILENT, BROKEN).
- **`api-params`** class on tables for parameter/command tables.
- **`callout`** divs for warnings/info/danger notes (`callout--info`, `callout--warning`, `callout--danger`).
- **`byte-table`** class for hex/binary layout tables.

### Mobile Considerations

- Tables must work on mobile. Avoid 3+ column tables with long `code` content.
- `code` elements have `white-space: nowrap` globally. Long code strings in table cells can push tables wider than the viewport. Use plain text descriptions instead of long code strings where possible.
- `pre code` blocks override with `white-space: pre`.
- Cards use `overflow: hidden`, so content wider than the card gets clipped.

## Favicon and Social Embeds

The site favicon lives in `public/favicon.svg` (served at a stable `/favicon.svg` URL via Vite's `publicDir`). A PNG copy at `public/favicon.png` is used as the Open Graph / Twitter Card preview image for link embeds on Discord, Twitter/X, etc.

Embed metadata (description, `og:*`, `twitter:*` tags) is defined in `src/index.html`. The preview image URL points to `https://makcu.k4tech.net/favicon.png`.

**If the favicon SVG is modified, regenerate the PNG:**

```bash
magick -background none -density 2048 public/favicon.svg -resize 1024x1024 public/favicon.png
```

Requires ImageMagick (`magick` CLI). The `-density 2048` flag rasterizes the SVG at high DPI before downscaling, which keeps the output sharp.

## Content Rules

- The Native API section documents the MAKCU device firmware. Do not reference the Rust library in native API pages.
- The Rust Library section documents the MAKCU Rust crate. It is currently a placeholder.
- All commands have been physically verified against firmware v3.2 (left) / v3.7 (right).
- Commands marked as broken/silent are documented in `BrokenCommands.tsx`.
- `km.serial()` has never been observed to work on any tested hardware.

## Adding a New Page

1. Create the page component in the appropriate directory under `src/app/pages/`.
2. Wrap every Card in `<div id="..." data-search-target>`.
3. Add a route in `App.tsx`.
4. Add a tab entry in the appropriate array in `DocsLayout.tsx`.
5. Add search entries to `searchIndex.ts` (page-level + section-level + individual commands).
6. Follow existing page patterns for consistency.
