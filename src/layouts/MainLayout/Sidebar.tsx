import React from 'react';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
	return (
		<aside className={styles.sidebar}>
			<nav>
				<ul>
					<li>Dashboard</li>
					<li>Profile</li>
					<li>Settings</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
