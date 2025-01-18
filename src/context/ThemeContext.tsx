import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { darkTheme, lightTheme } from 'utils/utils';

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
	currentTheme: typeof lightTheme | typeof darkTheme;
}

const ThemeContext = createContext<ThemeContextType>({
	isDarkMode: false,
	toggleTheme: () => {},
	currentTheme: lightTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem('themeMode');
		return saved ? JSON.parse(saved) : false;
	});

	const currentTheme = isDarkMode ? darkTheme : lightTheme;

	useEffect(() => {
		localStorage.setItem('themeMode', JSON.stringify(isDarkMode));
		document.body.className = isDarkMode ? 'dark' : 'light'; // Apply body class for global CSS variables
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prevMode: boolean) => !prevMode);
	};

	return (
		<ThemeContext.Provider
			value={{ isDarkMode, toggleTheme, currentTheme }}
		>
			<ConfigProvider
				theme={{
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
					},
				}}
			>
				{children}
			</ConfigProvider>
		</ThemeContext.Provider>
	);
};
