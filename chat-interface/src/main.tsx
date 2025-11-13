import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyThemeMode, detectPreferredTheme, initializeTheme } from './theme/appTheme'

initializeTheme()
applyThemeMode(detectPreferredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
