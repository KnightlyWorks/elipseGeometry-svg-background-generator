## 🌀 Generative SVG Waves

An experimental generative SVG tool focused on procedural Bézier curves, wave transformations, and controlled visual complexity.

This project exists as:

* a **playground for generative geometry**
* a **stress test for complex React state**
* a **portfolio piece**, not a product

> Complexity is intentional.
> Readability is local.
> Determinism is preferred over magic.

---

## ✨ Features

* Procedural SVG path generation based on cubic Bézier curves
* Curve splitting and optimization workflows
* Modular pattern system (pluggable generators)
* Gradient editor with live SVG output
* SVG transform controls (scale, translate, stroke)
* Exportable SVG markup
* No canvas, no WebGL — pure SVG

---

## 🧠 Design Philosophy

This project intentionally embraces:

* **non-trivial state graphs**

It is **not** optimized for:

* minimal abstractions
* beginner readability
* quick onboarding

If you're comfortable navigating React state and procedural logic, you'll feel at home.

---

## 🗂 Project Structure

```
src/
├── assets/                  # Static assets
│   ├── patternsPreviews/    # Pattern preview images. Preview image files must have the same name as the pattern JSX files, supporting formats: .webp, .png, .svg, .jpeg, or .jpg.
│   │   └── Placeholder.webp
│   ├── close-icon.svg
│   ├── footer-logo.svg
│   ├── github-mark-white.png
│   └── logo.svg
├── components/
│   ├── canvas/              # Main visualization components
│   │   ├── wavyBackground/  # Path generation math & utilities
│   │   │   ├── pathGeneration.js
│   │   │   └── waveTransforms.js
│   │   └── WavyBackground.jsx
│   ├── controls/            # Control panel and settings UI
│   │   ├── panels/          # Configuration panels for different features
│   │   │   ├── GlobalSettings.jsx
│   │   │   ├── GradientEditor.jsx
│   │   │   ├── PatternSelectionPanel.jsx
│   │   │   ├── SplitCurves.jsx
│   │   │   └── SvgTransform.jsx
│   │   ├── patterns/        # Pattern generation algorithms
│   │   │   ├── index.jsx    # Pattern selector modal logic
│   │   │   ├── HorizontalWavyLines.jsx
│   │   │   └── SpiralPattern.jsx
│   │   ├── widgets/         # Reusable UI components
│   │   │   ├── tooltips/
│   │   │   │   └── Tooltip.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── ControlRangeSlider.jsx
│   │   │   ├── FieldSetGroup.jsx
│   │   │   └── RadioButtonsPanel.jsx
│   │   └── Controls.jsx
│   ├── layout/              # Layout components
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   └── svg/                 # SVG-related components
│       ├── svgImportExport/ # Modals for SVG code manipulation (Import/Export/Edit)
│       │   ├── SvgEditorModal.jsx
│       │   ├── SvgExportModal.jsx
│       │   └── SvgInputModal.jsx
│       └── SvgGradientDef.jsx
├── constants/               # Global application constants
│   └── constants.js
├── hooks/                   # Custom React hooks
│   ├── useBezierActions.js
│   ├── useGradientStops.js
│   └── useResizeObserver.js
├── styles/                  # Global styles
│   └── index.css
├── utils/                   # Helper functions
│   ├── camelCaseToSpaced.js
│   ├── createBezierFromPoints.js
│   ├── idFromName.js
│   └── splitCubicBezier.js
├── App.jsx                  # Root application component
└── main.jsx                 # Application entry point
```

---

## 🧩 Key Directories Explained

### `components/canvas/`

Responsible for **all SVG generation and rendering**.
This is where the math lives.

* `wavyBackground/` contains:

  * constants
  * path generation logic
  * wave and curve transformations

### `components/controls/`

UI layer for manipulating parameters.
Controls **never generate geometry directly** — they only affect state.

### `hooks/`

Custom hooks encapsulating:

* curve operations
* gradient state
* resize and layout observers

### `utils/`

Pure, deterministic helper functions.
No React. No side effects.

---

## 🧪 Intended Use

This project is **not** a drop-in library.
Feel free to copy ideas, patterns, or math.

---

## ⚠️ Notes for Future Readers

* Some files may look intimidating — this is expected
* If something works and you don't know why, test before refactoring
* Visual correctness is often prioritized over abstraction purity

---

## 📄 License
Do whatever you want. MIT LICENSE
[See full License](./LICENSE)
