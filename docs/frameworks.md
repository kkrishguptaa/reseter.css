<!-- markdownlint-disable -->
# Framework Integration Guide

This guide shows how to integrate **Gardevoir (reseter.css)** into modern JavaScript frameworks and build tools with production‑focused patterns. It covers import order, SSR, performance, common pitfalls, and troubleshooting.

## Goals
- Consistent import ordering across all setups
- Clear SSR handling for Next.js / Nuxt
- Build tool examples (Vite, Webpack, Rollup)
- Performance & bundle size best practices
- Quick troubleshooting reference

## Core Principles
1. Reset First: Load Gardevoir before your own globals/components so overrides work.
2. One Reset Only: Do not stack with Normalize/Sanitize/other resets.
3. Predictable Overrides: Keep tokens (variables, design system) separate from component styles.
4. Ship Minified: Prefer the distributed `index.min.css` (or CDN) in production.
5. Version Pinning: Pin CDN versions for deterministic builds.

```html
<!-- Preferred CDN import (version pinned) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gardevoir@1.0.0" />
```

## Import Order Patterns

```css
/* main.css or entry.scss */
@import 'gardevoir';          /* Reset first */
@import './tokens.css';       /* Variables, CSS custom props */
@import './base.css';         /* Base typography/colors */
@import './components/button.css';
@import './utilities.css';
```

For JS entry imports, simply `import 'gardevoir';` before other style imports.

## React

### Vite (React)
```jsx
// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'gardevoir';          // Reset
import './globals.css';      // Your global styles
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

### Create React App
```js
// src/index.js
import 'gardevoir';
import './globals.css';
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(<App />);
```

## Next.js

### App Router
```tsx
// app/layout.tsx
import 'gardevoir';
import './globals.css';

export const metadata = { title: 'My App' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Pages Router
```tsx
// pages/_app.tsx
import 'gardevoir';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### SSR Optimization (Critical Snippet + Preload)
```tsx
// app/layout.tsx (advanced) inside <head>
<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/gardevoir@1.0.0" onload="this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gardevoir@1.0.0" /></noscript>
```

Avoid injecting the stylesheet conditionally on client only (causes hydration flashes).

## Vue 3 (Vite)
```js
// src/main.js
import { createApp } from 'vue';
import 'gardevoir';
import './globals.css';
import App from './App.vue';

createApp(App).mount('#app');
```

## Vue CLI
```js
// src/main.js
import 'gardevoir';
import './globals.css';
import Vue from 'vue';
import App from './App.vue';

new Vue({ render: h => h(App) }).$mount('#app');
```

## Nuxt 3
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['gardevoir', '~/assets/css/globals.css']
});
```

## Angular
```ts
// src/styles.css (or styles.scss referenced in angular.json)
@import 'gardevoir';
@import './globals.css';
```
Ensure "styles" array in angular.json includes the compiled/global file.

## Svelte (Vite / SvelteKit)
```js
// src/app.css
@import 'gardevoir';
/* other styles */
```
Then import `app.css` in root `+layout.svelte` / main entry.

## Build Tools

### Vite
No extra config needed. Just import in entry.
```js
// vite.config.js (optional if customizing)
import { defineConfig } from 'vite';
export default defineConfig({});
```

### Webpack
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};
```
```js
// src/index.js
import 'gardevoir';
import './globals.css';
```

### Rollup
```js
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  plugins: [
    postcss({ extract: true })
  ]
};
```

### Parcel
Parcel auto-handles CSS. Just import:
```js
import 'gardevoir';
import './globals.css';
```

## SSR Considerations
- Import globally (not conditionally) to avoid hydration mismatches.
- Preload CSS to reduce First Contentful Paint (FCP).
- Inline only minimal critical subset if absolutely necessary (e.g., box-sizing) – do not inline full reset unless audited.

## Performance Optimization
1. CDN + `preload` for static sites.
2. Pin versions (`@1.0.0`) for repeatable builds & caching.
3. Avoid multiple resets (size & cascade complexity).
4. Keep custom overrides minimal; lean on reset defaults.
5. Use HTTP/2 server push alternatives (preload) rather than late JS-driven injection.

### Preload Pattern
```html
<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/gardevoir@1.0.0" onload="this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gardevoir@1.0.0" /></noscript>
```

## Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| Custom styles ignored | Imported before reset | Import Gardevoir first, custom afterward |
| FOUC (flash of unstyled content) | Late style injection | Use `<link>` in head + `preload` pattern |
| Duplicate declarations | Multiple resets layered | Remove other reset/normalize libs |
| Hydration mismatch | Conditional client-only import | Import in root layout/server side too |
| Cache not updating | Unpinned CDN & aggressive caching | Pin version or add cache-busting query |
| Larger bundle | Inlined full reset multiple times | Single global import only |

## Advanced Patterns
- Partial Imports: Not currently modular; if future versions add modules, import only required subsets.
- Scoped Resets: Generally avoid; applying reset globally is intentional for consistency.
- Critical Inline: Restrict to minimal subset (box-sizing + margins) if performance audits justify.

## Quick Reference (Cheat Sheet)
| Stack | Where To Import | Notes |
|-------|-----------------|-------|
| React (Vite/CRA) | Entry `main.jsx` / `index.js` | First import before globals |
| Next.js (App) | `app/layout.tsx` | Top-level import, supports SSR |
| Next.js (Pages) | `pages/_app.tsx` | Ensures global cascade |
| Vue (Vite) | `main.js` | Straight import |
| Nuxt 3 | `nuxt.config.ts (css[])` | Auto SSR + client |
| Angular | `styles.css` (angular.json) | Add early in styles list |
| SvelteKit | Root layout or entry css | Keep single import |
| Webpack | JS entry | Ensure css-loader present |
| Rollup | JS entry + postcss plugin | Extract CSS for production |

## Contributing Examples
If adding framework example folders (e.g. `examples/nextjs`), keep them minimal: one page, show import order, include a README, avoid heavy dependencies.

---
Need an additional framework pattern? Open an issue with details (runtime, SSR vs CSR, styling approach).

<!-- markdownlint-enable -->
