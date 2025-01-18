//src/components/ThemeSwitch/ThemeSwitch.tsx
import React from 'react';
import { Switch } from 'antd';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitch: React.FC = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return <Switch checked={isDarkMode} onChange={toggleTheme} />;
};

export default ThemeSwitch;
