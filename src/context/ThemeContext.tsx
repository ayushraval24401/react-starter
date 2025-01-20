import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from 'react';
import { ConfigProvider, theme } from 'antd';
import { darkTheme, lightTheme } from 'utils/utils';
export interface ThemeColors {
	primaryColor: string;
	secondaryColor: string;
	textColor: string;
	textSecondary: string;
	borderColor: string;
	hoverColor: string;
	sidebarBg: string;
	headerBg: string;
	cardBg: string;
	linkColor: string;
	linkHover: string;
}

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
	currentTheme: ThemeColors;
}

// context/ThemeContext.tsx

const ThemeContext = createContext<ThemeContextType>({
	isDarkMode: false,
	toggleTheme: () => {},
	currentTheme: lightTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Initialize theme from localStorage with error handling
	const [isDarkMode, setIsDarkMode] = useState(() => {
		try {
			const saved = localStorage.getItem('themeMode');
			return saved
				? JSON.parse(saved)
				: window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			return false;
		}
	});

	// Memoize current theme to prevent unnecessary recalculations
	const currentTheme = React.useMemo(
		() => (isDarkMode ? darkTheme : lightTheme),
		[isDarkMode]
	);

	// Memoize theme toggle function
	const toggleTheme = useCallback(() => {
		setIsDarkMode((prev: boolean) => !prev);
	}, []);

	// Effect for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Effect for theme persistence and body class
	useEffect(() => {
		try {
			localStorage.setItem('themeMode', JSON.stringify(isDarkMode));
		} catch (error) {
			console.error('Failed to save theme preference:', error);
		}

		document.body.className = isDarkMode ? 'dark' : 'light';

		// Optional: Add CSS variables for non-Ant Design components
		Object.entries(currentTheme).forEach(([key, value]) => {
			document.documentElement.style.setProperty(`--${key}`, value);
		});
	}, [isDarkMode, currentTheme]);

	// Memoize ConfigProvider theme config
	const themeConfig = React.useMemo(
		() => ({
			algorithm: isDarkMode
				? theme.darkAlgorithm
				: theme.defaultAlgorithm,
			token: {
				colorPrimary: currentTheme.primaryColor,
				colorBgContainer: currentTheme.secondaryColor,
				colorText: currentTheme.textColor,
				colorTextSecondary: currentTheme.textSecondary,
				colorBorder: currentTheme.borderColor,
			},
			components: {
				Layout: {
					headerBg: currentTheme.headerBg,
					siderBg: currentTheme.sidebarBg,
				},
				Menu: {
					itemBg: currentTheme.secondaryColor,
					itemSelectedBg: currentTheme.primaryColor,
					itemHoverBg: currentTheme.hoverColor,
				},
				Card: {
					colorBgContainer: currentTheme.cardBg,
				},
				Button: {
					colorPrimaryHover: currentTheme.linkHover,
				},
			},
		}),
		[isDarkMode, currentTheme]
	);

	return (
		<ThemeContext.Provider
			value={{ isDarkMode, toggleTheme, currentTheme }}
		>
			<ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
		</ThemeContext.Provider>
	);
};
