import {
	BarChartOutlined,
	ClockCircleOutlined,
	DashboardOutlined,
	MenuFoldOutlined,
	UserOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import './index.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const navigate = useNavigate();

	const toggleCollapse = () => setCollapsed(!collapsed);

	const handleMenuClick = ({ key }: { key: string }) => {
		const routes: { [n: string]: string } = {
			'1': '/',
			'2': '/employee',
			'3': '/time-activities',
			'4': '/payroll',
			'5': '/reports',
		};
		navigate(routes[key]);
	};

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={setCollapsed}
			className={`${styles.sidebar} sidebar`}
			width={200}
			trigger={null}
		>
			<div
				className={styles.logoContainer}
				onClick={collapsed ? toggleCollapse : undefined}
				style={{ cursor: collapsed ? 'pointer' : 'default' }}
			>
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
						transition: 'transform 0.7s ease-in-out',
						padding: '10px',
					}}
				/>

				{!collapsed && (
					<div
						className={styles.collapseTrigger}
						onClick={toggleCollapse}
					>
						<MenuFoldOutlined />
					</div>
				)}
			</div>

			<div className={styles.menuContainer}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					className={styles.menu}
					onClick={handleMenuClick}
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
			</div>
		</Sider>
	);
};

export default Sidebar;
