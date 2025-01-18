//src/components/ThemeSwitch/ThemeSwitch.tsx
import { Switch } from 'antd';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitch: React.FC = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return <Switch checked={isDarkMode} onChange={toggleTheme} />;
};

export default ThemeSwitch;
