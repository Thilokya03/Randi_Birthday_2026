# Randima Dulmini Birthday Surprise

A polished frontend-only React + Vite birthday surprise website for Randima Dulmini.

## Tech Stack

- React
- Vite
- CSS
- localStorage
- GitHub Pages deployment with `gh-pages`
- No backend
- No database

## Project Structure

```text
Birthday/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── gallery/
│   │   │   └── README.md
│   │   ├── README.md
│   │   ├── love-bloom.svg
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Features

- Clean portfolio-style landing page before unlock.
- Subtle puzzle verification card.
- Puzzle answer: `19 + 9 + 4 - 2 = 30`.
- Wrong answer message: `Hmm, try again sweetheart 💗`.
- Unlock state saved in `localStorage`.
- Hidden/small `Lock again` button.
- Beautiful preloader animation.
- Floating hearts, sparkles, glassmorphism cards, and confetti unlock animation.
- Background music button, muted by default.
- Birthday letter modal.
- Birthday date highlight for `19`.
- Romantic hero section.
- Reasons I love you section.
- Memory cards.
- Photo gallery with real image support.
- Animated placeholders when no photos exist.
- Animated timeline.
- Birthday wishes jar.
- Final fullscreen romantic message.
- Smooth scrolling and mobile responsive layout.

## Photo Gallery

Add real photos here:

```text
src/assets/gallery/
```

Supported formats:

```text
.jpg
.jpeg
.png
.webp
.avif
```

The app automatically imports gallery photos. If no photos exist, fallback romantic cards are shown.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Production files are generated in:

```text
dist/
```

## GitHub Pages Deployment

This project is configured for a GitHub Pages repository path:

```js
base: "/Portfolio/"
```

Exact commands:

```bash
npm install
npm install gh-pages --save-dev
npm run deploy
```

Deployment scripts in `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Before deploying, replace `your-username` in `package.json` with your GitHub username:

```json
"homepage": "https://your-username.github.io/Portfolio/"
```

Then push the project to a GitHub repository named `Portfolio` and run:

```bash
npm run deploy
```
