const withFallback = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value : fallback

const appConfig = {
  appName: withFallback(import.meta.env.VITE_APP_NAME, 'BrainyChat'),
  tagline: withFallback(
    import.meta.env.VITE_APP_TAGLINE,
    'Conversational intelligence for creative teams.'
  ),
  logoGlyph: withFallback(import.meta.env.VITE_APP_LOGO, '🧠'),
  welcomeMessage: withFallback(
    import.meta.env.VITE_DEFAULT_GREETING,
    'Welcome to BrainyChat! Ask anything to get started.'
  ),
  historyTitle: withFallback(import.meta.env.VITE_SIDEBAR_TITLE, 'Chat History'),
  newChatLabel: withFallback(import.meta.env.VITE_NEW_CHAT_LABEL, 'New Chat'),
  theme: {
    fontFamily: withFallback(
      import.meta.env.VITE_FONT_FAMILY,
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ),
    borderRadius: withFallback(import.meta.env.VITE_BORDER_RADIUS, '18px'),
    colors: {
      primary: withFallback(import.meta.env.VITE_COLOR_PRIMARY, '#6366F1'),
      accent: withFallback(import.meta.env.VITE_COLOR_ACCENT, '#F97316'),
      sidebar: {
        light: withFallback(import.meta.env.VITE_COLOR_SIDEBAR_LIGHT, '#F8FAFC'),
        dark: withFallback(import.meta.env.VITE_COLOR_SIDEBAR_DARK, '#0B1120'),
      },
      background: {
        light: withFallback(import.meta.env.VITE_COLOR_BACKGROUND_LIGHT, '#FFFFFF'),
        dark: withFallback(import.meta.env.VITE_COLOR_BACKGROUND_DARK, '#020617'),
      },
      surface: {
        light: withFallback(import.meta.env.VITE_COLOR_SURFACE_LIGHT, '#EEF2FF'),
        dark: withFallback(import.meta.env.VITE_COLOR_SURFACE_DARK, '#111827'),
      },
      border: {
        light: withFallback(import.meta.env.VITE_COLOR_BORDER_LIGHT, '#E2E8F0'),
        dark: withFallback(import.meta.env.VITE_COLOR_BORDER_DARK, '#1E293B'),
      },
      text: {
        light: withFallback(import.meta.env.VITE_COLOR_TEXT_LIGHT, '#0F172A'),
        subtleLight: withFallback(import.meta.env.VITE_COLOR_TEXT_SUBTLE_LIGHT, '#475569'),
        dark: withFallback(import.meta.env.VITE_COLOR_TEXT_DARK, '#E2E8F0'),
        subtleDark: withFallback(import.meta.env.VITE_COLOR_TEXT_SUBTLE_DARK, '#94A3B8'),
      },
      messageUser: withFallback(
        import.meta.env.VITE_COLOR_MESSAGE_USER,
        '#312E81'
      ),
      messageAssistant: withFallback(
        import.meta.env.VITE_COLOR_MESSAGE_ASSISTANT,
        '#FFFFFF'
      ),
    },
    shadows: {
      medium: withFallback(
        import.meta.env.VITE_SHADOW_MEDIUM,
        '0 20px 45px -25px rgba(79, 70, 229, 0.35)'
      ),
    },
  },
}

export default appConfig
