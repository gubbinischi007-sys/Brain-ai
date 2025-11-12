## NovaChat (Vite + React + TS)

A clean, modern chat interface inspired by ChatGPT/Gemini/Claude with a unique visual style. Includes:
- Welcome message on load
- Chat input/output
- Clear logo and name
- Sidebar with searchable, pinnable chat history
- Settings icon and theme toggle (light/dark)
- All major UI elements configurable via environment variables

### Quick Start
1) Install
```
cd chat-interface
npm install
```
2) Configure (optional)
```
cp .env.example .env
# then edit .env to customize name, colors, fonts, etc.
```
3) Run
```
npm run dev
```

### Environment Configuration
Copy `.env.example` to `.env` and adjust:
- Branding: `VITE_APP_NAME`, `VITE_APP_TAGLINE`, `VITE_APP_LOGO`
- Messages: `VITE_DEFAULT_GREETING`, `VITE_SIDEBAR_TITLE`
- Theme: `VITE_FONT_FAMILY`, `VITE_BORDER_RADIUS`, and all `VITE_COLOR_*`

All values are applied at runtime via CSS variables in `src/theme/appTheme.ts` and read from `src/config/appConfig.ts`.

### Notes
- This project is frontend-only; the assistant response is mocked.
- Built with Vite (React + TypeScript).

