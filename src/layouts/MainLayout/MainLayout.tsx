import { Layout } from 'antd';
import React from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import styles from './MainLayout.module.scss';
const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout>
				<AppHeader />

				<Content className={styles.siteLayoutBackground}>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
