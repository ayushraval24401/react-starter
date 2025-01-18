import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import Sidebar from 'components/Layout/Sidebar';
import AppHeader from 'components/Layout/Header';
const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = () => {
	return (
		<Layout style={{ minHeight: '100vh' }} className={styles.layout}>
			<Sidebar />
			<Layout>
				<AppHeader />
				<Content className={styles.content}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
