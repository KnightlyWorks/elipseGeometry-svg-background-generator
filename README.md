## Project Structure

```
src/
├── components/
│   ├── canvas/              # Main visualization components
│   │   ├── wavyBackground/  # Path generation math & utilities
│   │   │   ├── constants.js
│   │   │   ├── pathGeneration.js
│   │   │   └── waveTransforms.js
│   │   └── WavyBackground.jsx
│   ├── controls/            # Control panel and settings UI
│   │   ├── Controls.jsx     # Main control panel container
│   │   ├── panels/          # Configuration panels for different features
│   │   │   ├── GradientEditor.jsx
│   │   │   ├── PatternSelectionPanel.jsx
│   │   │   ├── SvgTransform.jsx
│   │   │   └── ...
│   │   ├── patterns/        # Pattern generation algorithms
│   │   │   ├── index.jsx    # Pattern selector modal
│   │   │   ├── HorizontalWavyLines.jsx
│   │   │   ├── SpiralPattern.jsx
│   │   │   └── ...
│   │   └── widgets/         # Reusable UI components
│   │       ├── Checkbox.jsx
│   │       ├── ControlRangeSlider.jsx
│   │       ├── FieldSetGroup.jsx
│   │       ├── RadioButtonsPanel.jsx
│   │       └── ...
│   ├── layout/              # Layout components
│   │   └── Header.jsx
│   └── svg/                 # SVG-related utilities
│       └── SvgGradientDef.jsx
├── hooks/                   # Custom React hooks
│   └── useGradientStops.js
├── styles/                  # Global styles
│   └── index.css
├── utils/                   # Helper functions
│   ├── camelCaseToSpaced.js
│   └── idFromName.js
├── assets/                  # Static assets
│   ├── logo.svg
│   └── patternsPreviews/    # Pattern preview images. Preview image files must have the same name as the pattern JSX files, supporting formats: .webp, .png, .svg, .jpeg, or .jpg.
│       └── Placeholder.webp
├── App.jsx                  # Root application component
└── main.jsx                 # Application entry point
```

### Directory Overview

- **`components/canvas/`** - Core visualization layer, handles SVG rendering
  - **`wavyBackground/`** - Pure math functions for path generation and wave transformations
- **`components/controls/`** - All UI controls and configuration interfaces
  - **`panels/`** - Feature-specific configuration panels
  - **`patterns/`** - Pluggable pattern generation algorithms (each contains its own logic)
  - **`widgets/`** - Generic, reusable form components
- **`components/layout/`** - App shell and navigation components
- **`components/svg/`** - SVG definitions and utilities
- **`hooks/`** - Shared React hooks for state management
- **`styles/`** - Global CSS and theme definitions
- **`utils/`** - Pure utility functions
- **`assets/`** - Images, icons, and static resources
