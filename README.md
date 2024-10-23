# Vitral Card Game Templating

![Vitral Icon](misc/icon.svg)

## About

**Vitral** is a tool for composing game cards using images and text.

It doesn't provide image editing tools but instead uses images stored on your computer to automatically generate cards. This allows for fast iterations and live previews.

All files can be updated outside the application using any program, and all data is stored in simple JSON and CSV formats, making it Git-friendly.

This project was created as a way for me to learn Vue.js. I also had a prior tool for composing cards, but it was a mess of JavaScript scripts. This led to the idea of creating a visual tool to improve my workflow, which now serves as a cool project to showcase in interviews. Additionally, it's nice to have an open-source project!

This project was made using the [electron-vue-template](https://github.com/Deluze/electron-vue-template) boilerplate.

### Features

- Supported image formats: PNG, JPEG, WebP, GIF, SVG
- Export options: PNG, JPEG, TIFF, or PDF
- Export individual cards or multiple cards in a single file for fast printing
- Edit your cards visually or directly in the CSV file
- Use templating to compose cards, allowing for reusable components across cards to maintain visual consistency
- Real-time updates: Modify an image in your main tool and see all cards update instantly
- Open source!

## How to Run

### Requirements

- Node.js 18.16 or higher is required.

### Development Mode

```bash
npm install
npm run dev
```

### Build

``` bash
npm install
npm run build
```

## How to contribute

If you find any bugs or have suggestions, please open an issue. Also, consider leaving a star on the GitHub page — it would mean a lot!
