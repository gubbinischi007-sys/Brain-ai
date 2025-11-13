import appConfig from '../config/appConfig'

type ThemeMode = 'light' | 'dark'

const setCSSVar = (name: string, value: string) => {
	document.documentElement.style.setProperty(name, value)
}

export const initializeTheme = () => {
	const { theme } = appConfig

	setCSSVar('--app-font-family', theme.fontFamily)
	setCSSVar('--app-border-radius', theme.borderRadius)
	setCSSVar('--color-primary', theme.colors.primary)
	setCSSVar('--color-accent', theme.colors.accent)
	setCSSVar('--color-sidebar-light', theme.colors.sidebar.light)
	setCSSVar('--color-sidebar-dark', theme.colors.sidebar.dark)
	setCSSVar('--color-background-light', theme.colors.background.light)
	setCSSVar('--color-background-dark', theme.colors.background.dark)
	setCSSVar('--color-surface-light', theme.colors.surface.light)
	setCSSVar('--color-surface-dark', theme.colors.surface.dark)
	setCSSVar('--color-border-light', theme.colors.border.light)
	setCSSVar('--color-border-dark', theme.colors.border.dark)
	setCSSVar('--color-text-light', theme.colors.text.light)
	setCSSVar('--color-text-subtle-light', theme.colors.text.subtleLight)
	setCSSVar('--color-text-dark', theme.colors.text.dark)
	setCSSVar('--color-text-subtle-dark', theme.colors.text.subtleDark)
	setCSSVar('--color-message-user', theme.colors.messageUser)
	setCSSVar('--color-message-assistant', theme.colors.messageAssistant)
	setCSSVar('--elevation-medium', theme.shadows.medium)
}

export const applyThemeMode = (mode: ThemeMode) => {
	document.body.dataset.theme = mode
}

export const detectPreferredTheme = (): ThemeMode => {
	if (typeof window === 'undefined') return 'light'
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export type { ThemeMode }
