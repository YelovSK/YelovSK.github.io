# GitHub Pages Personal Website

> **Note**: Keep this file updated when making relevant changes to the project.

Personal website built with Angular, hosted on GitHub Pages.

## Tech Stack

- **Framework**: Angular 21 (standalone components)
- **UI Library**: Tailwind CSS
- **State Management**: Angular Signals + RxJS
- **Package Manager**: bun
- **Deployment**: GitHub Pages (via GitHub Actions workflow)

## Development

```bash
bun start        # Dev server at localhost:4200
bun run build    # Production build to /docs
bun test         # Run Karma tests
```

## Project Structure

```
src/app/
├── pages/          # Route components
│   ├── home/       # Repeating "A" animation (RxJS timer demo)
│   ├── specs/      # PC specs list with native details/summary elements
│   ├── software/   # WIP - software recommendations
│   ├── click/      # Clicker game (catch the jumping rat)
│   ├── word/       # Random English word display
│   └── canvas/     # Drawing app with brush/rectangle tools
├── components/
│   ├── sidebar/    # Sidebar navigation (Zinc/Emerald theme)
│   └── drawing/    # Canvas drawing tools (BrushTool, RectangleTool)
├── services/
│   ├── http.service.ts   # Fetches word list from GitHub
│   └── loop.service.ts   # Game loop for canvas
├── pipes/          # BirthdayToAgePipe (dog age calculation)
└── common/         # Constants (asset paths)
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomeComponent | Animated letter sequence |
| `/specs` | SpecsComponent | Hardware/gear specifications |
| `/software` | SoftwareComponent | Software tools (WIP) |
| `/click` | ClickComponent | Clicker mini-game |
| `/word` | WordComponent | Random word generator |
| `/canvas` | CanvasComponent | Drawing application |

## Key Files

- **Routes**: `src/app/app-routing.module.ts`
- **Specs Data**: `src/app/pages/specs/specs.data.ts` - Comprehensive hardware/gear list
- **Assets**: `src/assets/` - Images (ddx.webp, xdd.webp, Sunny.png, memes)
- **Constants**: `src/app/common/constants.ts` - Asset path references

## Notes

- Specs page includes current and obsolete items (sorted, obsolete shown last)
- Click game uses rat images that swap on click (xdd/ddx)
- Canvas has 480fps event loop, 240fps draw loop
- Word page fetches ~370k English words from dwyl/english-words repo
