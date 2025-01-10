import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
	onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>Logo</div>
			<div className={styles.actions}>
				<button className={styles.logout}>Logout</button>
				<div className={styles.profile}>
					<img src="/path/to/profile.jpg" alt="User Profile" />
				</div>
				<button className={styles.settings} onClick={onSettingsClick}>
					⚙️
				</button>
			</div>
		</header>
	);
};

export default Header;
