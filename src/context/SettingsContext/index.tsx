// src/contexts/SettingsContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SettingsContextType {
	isSettingsOpen: boolean;
	openSettings: () => void;
	closeSettings: () => void;
	toggleSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const openSettings = () => {
		setIsSettingsOpen(true);
		// If not already in settings, navigate to settings home
		if (!location.pathname.startsWith('/settings')) {
			navigate('/settings');
		}
	};

	const closeSettings = () => {
		setIsSettingsOpen(false);
		// If in settings, navigate back to main layout
		if (location.pathname.startsWith('/settings')) {
			navigate('/');
		}
	};

	const toggleSettings = () => {
		if (isSettingsOpen) {
			setIsSettingsOpen(false);
			// If in settings, navigate back to main layout
			if (location.pathname.startsWith('/settings')) {
				navigate('/');
			}
		} else {
			setIsSettingsOpen(true);
			// If not already in settings, navigate to settings home
			if (!location.pathname.startsWith('/settings')) {
				navigate('/settings');
			}
		}
	};

	return (
		<SettingsContext.Provider
			value={{
				isSettingsOpen,
				openSettings,
				closeSettings,
				toggleSettings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return context;
};
