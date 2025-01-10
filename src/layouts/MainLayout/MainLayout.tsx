import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import styles from '';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const toggleSettingsModal = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

	return (
		<div className={styles.mainLayout}>
			<Header onSettingsClick={toggleSettingsModal} />
			<Sidebar />
			<main className={styles.content}>{children}</main>
			{isSettingsOpen && <SettingsModal onClose={toggleSettingsModal} />}
		</div>
	);
};

export default MainLayout;
