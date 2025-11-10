# Framework Integration Guide for Gardevoir

Modern web development relies heavily on JavaScript frameworks and build tools. This guide provides comprehensive examples and best practices for integrating Gardevoir with popular frameworks and build systems.

## Table of Contents

- [React & Next.js](#react--nextjs)
- [Vue & Nuxt.js](#vue--nuxtjs)
- [Angular](#angular)
- [Svelte & SvelteKit](#svelte--sveltekit)
- [Build Tools & Bundlers](#build-tools--bundlers)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## React & Next.js

### Standard React Application

#### Installation
```bash
npm install gardevoir
# or
yarn add gardevoir
```

#### Method 1: Import in your main CSS file
```css
/* src/styles/globals.css or src/index.css */
@import 'gardevoir';

/* Your custom styles go here */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### Method 2: Import in your JavaScript entry point
```jsx
// src/index.js or src/App.js
import 'gardevoir';
import './App.css'; // Your custom styles

function App() {
  return (
    <div className="App">
      <h1>Hello Gardevoir!</h1>
      <p>CSS Reset is working perfectly!</p>
    </div>
  );
}

export default App;
```

### Next.js Integration

#### In `_app.js` (Recommended)
```jsx
// pages/_app.js
import 'gardevoir';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

#### With CSS Modules
```jsx
// pages/_app.js
import 'gardevoir';

// components/Button.module.css
.button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  background: #007acc;
  color: white;
  cursor: pointer;
}

// components/Button.js  
import styles from './Button.module.css';

export default function Button({ children, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
```

#### Server-Side Rendering (SSR) Considerations
```jsx
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true, // Optimize CSS delivery
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
```

## Vue & Nuxt.js

### Vue 3 with Vite

#### Method 1: Import in main.js
```js
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'gardevoir';
import './style.css'; // Your custom styles

createApp(App).mount('#app');
```

#### Method 2: Import in style.css
```css
/* src/style.css */
@import 'gardevoir';

/* Your Vue-specific styles */
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
```

### Nuxt.js Integration

#### Option 1: Global CSS (Recommended)
```js
// nuxt.config.js
export default {
  css: [
    'gardevoir',
    '~/assets/css/main.css' // Your custom styles
  ],
  // ... other config
}
```

#### Option 2: Plugin Method
```js
// plugins/gardevoir.client.js
import 'gardevoir';

// nuxt.config.js
export default {
  plugins: [
    { src: '~/plugins/gardevoir.client.js', mode: 'client' }
  ]
}
```

### Scoped Styles Compatibility
```vue
<!-- components/Card.vue -->
<template>
  <div class="card">
    <h2 class="card-title">{{ title }}</h2>
    <p class="card-content">{{ content }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
```

## Angular

### Installation & Setup
```bash
ng new my-app
cd my-app
npm install gardevoir
```

#### Method 1: Import in styles.css
```css
/* src/styles.css */
@import 'gardevoir';

/* Your global styles */
html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}
```

#### Method 2: Angular CLI Configuration
```json
// angular.json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/gardevoir/gardevoir.min.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### Component-Level Integration
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Welcome to Angular with Gardevoir</h1>
      <p>CSS reset is working perfectly!</p>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
```

```css
/* app.component.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #1976d2;
  text-align: center;
}
```

## Svelte & SvelteKit

### SvelteKit Integration
```js
// app.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

```css
/* src/app.css */
@import 'gardevoir';

/* Your global styles */
:root {
  --primary-color: #ff3e00;
  --text-color: #333;
}

body {
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

```js
// src/app.js
import './app.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')
});

export default app;
```

### Svelte Component Example
```svelte
<!-- src/lib/Card.svelte -->
<script>
  export let title;
  export let content;
</script>

<div class="card">
  <h2>{title}</h2>
  <p>{content}</p>
</div>

<style>
  .card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 1rem 0;
    color: var(--primary-color);
  }
</style>
```

## Build Tools & Bundlers

### Webpack Configuration
```js
// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
};
```

### Vite Configuration
```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import 'gardevoir';`
      }
    }
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/styles/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
```

### Rollup Configuration
```js
// rollup.config.js
import css from 'rollup-plugin-css-only';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    css({ output: 'bundle.css' })
  ]
};
```

## Performance Optimization

### CSS Purging with PurgeCSS
```js
// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [purgecss({
      content: ['./src/**/*.{js,jsx,ts,tsx,vue,svelte,html}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })] : [])
  ]
};
```

### Critical CSS Extraction
```js
// Critical CSS for above-the-fold content
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  minify: true
});
```

### Bundle Size Optimization
```js
// webpack.config.js - Production optimizations
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

## Troubleshooting

### Common Integration Issues

#### 1. CSS Order Problems
**Problem**: Custom styles not applying due to CSS specificity
**Solution**: Ensure Gardevoir is imported before your custom styles

```css
/* ✅ Correct order */
@import 'gardevoir';
@import './custom-styles.css';

/* ❌ Wrong order */
@import './custom-styles.css';
@import 'gardevoir'; /* This will override your custom styles */
```

#### 2. Build Tool Import Issues
**Problem**: `Cannot resolve module 'gardevoir'`
**Solution**: Check your build tool configuration

```js
// Webpack resolve configuration
module.exports = {
  resolve: {
    modules: ['node_modules'],
    alias: {
      'gardevoir': path.resolve(__dirname, 'node_modules/gardevoir')
    }
  }
};
```

#### 3. Server-Side Rendering Flash
**Problem**: Unstyled content flash on SSR applications
**Solution**: Proper CSS loading strategy

```jsx
// Next.js - Prevent FOUC
import { Head } from 'next/document';

<Head>
  <link
    rel="preload"
    href="/path/to/gardevoir.css"
    as="style"
    onLoad="this.onload=null;this.rel='stylesheet'"
  />
  <noscript>
    <link rel="stylesheet" href="/path/to/gardevoir.css" />
  </noscript>
</Head>
```

#### 4. CSS-in-JS Conflicts
**Problem**: Styled-components or emotion overriding reset styles
**Solution**: Use CSS reset with proper injection order

```jsx
// styled-components with ThemeProvider
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import 'gardevoir';
  
  /* Additional global styles */
  body {
    font-family: ${props => props.theme.fontFamily};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Performance Monitoring

#### Bundle Analysis
```bash
# Analyze your bundle to see Gardevoir's impact
npm install --save-dev webpack-bundle-analyzer

# Add to package.json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
```

#### Lighthouse Integration Testing
```js
// Test performance impact with Lighthouse CI
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run start',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

## Best Practices Summary

### ✅ Do's
- Import Gardevoir before your custom styles
- Use build-time optimizations in production
- Test across different browsers and devices
- Monitor bundle size impact
- Use proper CSS loading strategies for SSR

### ❌ Don'ts
- Don't override Gardevoir's core normalizations without good reason
- Don't load multiple CSS resets simultaneously
- Don't ignore build optimization opportunities
- Don't forget to test with your specific framework setup

## Framework-Specific Performance Tips

### React/Next.js
- Use `next/dynamic` for code splitting CSS-heavy components
- Implement proper preloading strategies
- Consider CSS Modules for component isolation

### Vue/Nuxt.js
- Leverage Nuxt's automatic CSS optimization
- Use scoped styles appropriately
- Implement proper SSR CSS handling

### Angular
- Use Angular CLI's built-in optimization features
- Implement OnPush change detection for better performance
- Consider lazy loading for large applications

### Svelte/SvelteKit
- Take advantage of Svelte's compile-time optimizations
- Use SvelteKit's automatic code splitting
- Implement proper preloading strategies

This integration guide ensures Gardevoir works seamlessly with modern development workflows while maintaining its performance benefits.