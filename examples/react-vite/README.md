# Gardevoir React + Vite Example

This example demonstrates how to properly integrate **Gardevoir (reseter.css)** into a React application built with Vite.

## Key Integration Points

### 1. Import Order (src/main.jsx)

```jsx
import "gardevoir"; // ✅ Import Gardevoir FIRST
import "./globals.css"; // ✅ Then your custom styles
import App from "./App.jsx";
```

**Why this order matters:**

- Gardevoir provides the CSS reset baseline
- Your custom styles override the reset where needed
- Importing Gardevoir last would override your custom styles

### 2. Package Installation

```bash
npm install gardevoir
```

Gardevoir is listed in `package.json` as a regular dependency since it's required for the app to render properly.

## Running the Example

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## What This Example Shows

- ✅ Correct import order in entry file
- ✅ Global styles layered after Gardevoir
- ✅ Component-specific styles
- ✅ Form elements with consistent styling
- ✅ Typography hierarchy
- ✅ Interactive elements (buttons, inputs)

## Project Structure

```plaintext
react-vite/
├── package.json          # Dependencies including Gardevoir
├── vite.config.js        # Standard Vite config
├── index.html            # HTML entry point
└── src/
    ├── main.jsx          # Entry file - imports Gardevoir first
    ├── globals.css       # Global custom styles
    ├── App.jsx           # Main component
    └── App.css           # Component styles
```

## Notes

- No special Vite configuration needed - it handles CSS imports automatically
- Gardevoir works seamlessly with Vite's fast refresh
- The reset applies globally before any component renders
- Custom styles can safely override reset values

## Troubleshooting

**Styles not applying?**

- Verify import order in `src/main.jsx`
- Ensure Gardevoir is imported before custom styles

**TypeScript version?**

- Rename `.jsx` files to `.tsx`
- Add `@types/react` and `@types/react-dom` dev dependencies

## Learn More

- [Gardevoir Documentation](../../README.md)
- [Framework Integration Guide](../../docs/frameworks.md)
- [Vite Documentation](https://vitejs.dev/)
