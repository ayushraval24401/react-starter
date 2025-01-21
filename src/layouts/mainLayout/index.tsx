import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.scss';
import Sidebar from 'components/Layout/Sidebar';
import AppHeader from 'components/Layout/Header';
import Box from 'components/Box';

const { Content } = Layout;

// Assuming these are the standard Ant Design sidebar widths
const EXPANDED_SIDEBAR_WIDTH = 200;
const COLLAPSED_SIDEBAR_WIDTH = 80;

const MainLayout: React.FC<{ children: React.ReactNode }> = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapse = () => setCollapsed(!collapsed);

	// Calculate content width based on sidebar state
	const getContentWidth = () => {
		const sidebarWidth = collapsed
			? COLLAPSED_SIDEBAR_WIDTH
			: EXPANDED_SIDEBAR_WIDTH;
		return `calc(100% - ${sidebarWidth}px)`;
	};

	return (
		<Layout style={{ minHeight: '100vh' }} className={styles.layout}>
			<Sidebar
				collapsed={collapsed}
				setCollapsed={setCollapsed}
				toggleCollapse={toggleCollapse}
			/>
			<Layout>
				<AppHeader />
				<Content>
					<Box
						padding={'20px'}
						gap={20}
						style={{
							width: '100%',
						}}
					>
						<Outlet />
					</Box>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
