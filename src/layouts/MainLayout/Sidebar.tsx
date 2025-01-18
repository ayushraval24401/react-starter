//src/layouts/MainLayout/Sidebar.tsx
import React, { useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import {
	DashboardOutlined,
	UserOutlined,
	ClockCircleOutlined,
	WalletOutlined,
	BarChartOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons';
import styles from './Sidebar.module.scss';
import './Sidebar.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapse = () => setCollapsed(!collapsed);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={setCollapsed}
			className={`${styles.sidebar} sidebar`}
			width={200}
			trigger={null}
		>
			{/* Logo and Trigger Section */}
			<div className={styles.logoContainer}>
				<Image
					src={
						collapsed
							? '/assets/images/Fevicon.png'
							: '/assets/images/WageWorks.png'
					}
					preview={false}
					alt="logo"
					className={styles.logoImage}
					style={{
						transform: collapsed ? 'scale(0.7)' : 'scale(1)',
						transition: 'transform 0.7s',
					}}
				/>
				<div
					className={styles.collapseTrigger}
					onClick={toggleCollapse}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</div>
			</div>

			{/* Menu Section */}
			<Menu
				mode="inline"
				defaultSelectedKeys={['1']}
				className={styles.menu}
			>
				<Menu.Item key="1" icon={<DashboardOutlined />}>
					Dashboard
				</Menu.Item>
				<Menu.Item key="2" icon={<UserOutlined />}>
					Employees
				</Menu.Item>
				<Menu.Item key="3" icon={<ClockCircleOutlined />}>
					Time Activities
				</Menu.Item>
				<Menu.Item key="4" icon={<WalletOutlined />}>
					Payroll
				</Menu.Item>
				<Menu.Item key="5" icon={<BarChartOutlined />}>
					Reports
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
