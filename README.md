[Live Demo](https://wawic-svg.vercel.app/) 

# 🌀 Generative SVG Waves

A playground for creating procedural geometry and experimenting with SVG paths.

This project is a personal portfolio piece designed to explore:

* **Generative geometry** (Bézier curves & wave math)
* **Complex React state management**
* **Pure SVG manipulation** without Canvas or WebGL

> **Note:** This is an experimental sandbox, not a production-ready library. It prioritizes visual flexibility and math experimentation over architectural simplicity.

---

## ✨ Features

* **Procedural Generation:** Create patterns based on cubic Bézier curves.
* **Math & Optimization:** Includes workflows for curve splitting and path optimization.
* **Modular System:** Easily plug in new pattern generators.
* **Live Editing:**
* Gradient editor with real-time preview.
* Full transform controls (scale, translate, stroke).


* **Export:** Get raw SVG markup ready for use.

---

## 🧠 Tech Stack & Approach

The codebase is heavy on math and state logic. Here is what to expect:

* **State Management:** The app uses a complex state graph to handle the interactions between controls and geometry.
* **No External Graphics Libs:** All visuals are calculated via raw math and rendered as standard DOM SVG elements.
* **Custom Hooks:** Logic for history (undo/redo), resizing, and gradient stops is encapsulated in hooks.

If you enjoy digging into procedural logic and React performance optimization, you'll find interesting patterns here.

---

## 🗂 Project Structure

 ```
src/
├── assets/                    # Static assets (icons, branding, previews)
│   ├── patternsPreviews/      # Pattern preview images. Filenames must match pattern JSX names.
│   │   └── Placeholder.webp
│   ├── close-icon.svg
│   ├── footer-logo.svg
│   ├── github-mark-white.png
│   └── logo.svg
├── components/
│   ├── canvas/                # Core visualization components
│   │   ├── wavyBackground/    # Path generation logic and mathematical utilities
│   │   │   ├── pathGeneration.js
│   │   │   └── waveTransforms.js
│   │   └── WavyBackground.jsx
│   ├── controls/              # UI for settings and configuration
│   │   ├── panels/            # Feature-specific configuration panels
│   │   │   ├── GlobalSettings.jsx
│   │   │   ├── GradientEditor.jsx
│   │   │   ├── PatternSelectionPanel.jsx
│   │   │   ├── SplitCurves.jsx
│   │   │   └── SvgTransform.jsx
│   │   ├── patterns/          # Geometry generation algorithms
│   │   │   ├── index.jsx      # Pattern selector logic and modal
│   │   │   ├── HorizontalWavyLines.jsx
│   │   │   ├── JoiningTwoEdges.jsx
│   │   │   └── SpiralPattern.jsx
│   │   └── Controls.jsx
│   ├── layout/                # Structural layout components
│   │   ├── headerComponents/  # Specialized header UI elements
│   │   │   ├── HistoryControls.jsx  # Undo/Redo buttons
│   │   │   └── MenuButton.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── svg/                    # SVG-specific processing and components
│   │   ├── svgImportExport/    # Modals for raw SVG code manipulation
│   │   │   ├── SvgEditorModal.jsx
│   │   │   ├── SvgExportModal.jsx
│   │   │   └── SvgInputModal.jsx
│   │   └── SvgGradientDef.jsx
│   └── widgets/               # Atomic, reusable UI components
│       ├── tooltips/
│       │   └── Tooltip.jsx
│       ├── Checkbox.jsx
│       ├── ControlRangeSlider.jsx
│       ├── FieldSetGroup.jsx
│       ├── Loader.jsx
│       └── RadioButtonsPanel.jsx
├── constants/                 # Global application-wide constants
│   └── constants.js
├── hooks/                     # Custom React hooks
│   ├── useBezierActions.js
│   ├── useGradientStops.js
│   ├── useHistoryHotkeys.js   # Global keyboard listener for Undo/Redo
│   ├── useResizeObserver.js   # Dynamic element dimension tracking
│   └── useUndoRedo.js         # Core state history management
├── styles/                    # Global CSS and styling
│   └── index.css
├── utils/                     # Generic helper functions
│   ├── camelCaseToSpaced.js
│   ├── createBezierFromPoints.js
│   ├── idFromName.js
│   └── splitCubicBezier.js
├── App.jsx                    # Root application entry point
└── main.jsx                   # React mounting and initialization

``` 

---

## 🧪 Quick Guide to Key Folders

* **`components/canvas/wavyBackground/`**: This is the heart of the project. It contains the logic that converts math into SVG paths.
* **`components/controls/`**: Contains the UI panels. These components only modify the global state.
* **`utils/`**: Helper functions for geometry and data formatting. These are pure functions and easy to test.

---

## 📝 A Note on Code Style

Since this is an experimental project, you might encounter dense logic in the visualization components. We prioritized getting the *visual math* right, which sometimes means the code is more complex than a typical CRUD application.

Feel free to copy parts of the math logic or pattern generators for your own projects!

---

## 📄 License

MIT License. Feel free to use this code however you like.
[See full License](./LICENSE)
