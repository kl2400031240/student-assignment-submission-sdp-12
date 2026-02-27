# Tailwind CSS Setup Instructions

This project has Tailwind CSS already configured. Here's what was set up:

## ✅ Files Configured

### 1. `tailwind.config.js`

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 3. `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes included */
```

## 🎨 Custom Utility Classes

The following custom classes are available throughout the project:

### Buttons

- `.btn-primary` - Blue primary button
- `.btn-secondary` - Gray secondary button

### Cards

- `.card` - White card with shadow and border

### Form Elements

- `.input-field` - Styled input/textarea
- `.label` - Styled form label

## 🌙 Dark Mode

Dark mode is enabled using the `class` strategy. Toggle it in the sidebar!

All components use `dark:` variants for dark mode styling.

## 📦 Dependencies Installed

- `tailwindcss@^3.4.1`
- `autoprefixer@^10.4.17`
- `postcss@^8.4.35`

## ✅ Verification

The setup is complete and working! No additional configuration needed.

Just run `npm run dev` and start coding!
