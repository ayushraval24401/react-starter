// src/layouts/SettingsLayout/index.tsx
import { Layout, Modal } from 'antd';
import AppHeader from 'components/Layout/MainLayout/Header';
import Sidebar from 'components/Layout/SettingsLayout/Sidebar';
import { useSettings } from 'context/SettingsContext';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

const { Content } = Layout;

const SettingLayout = () => {
	const { isSettingsOpen, closeSettings, openSettings } = useSettings();
	const location = useLocation();
	const isInSettings = location.pathname.startsWith('/settings');

	useEffect(() => {
		console.log('isInSettings: ', isInSettings);
		if (isInSettings) {
			openSettings();
		}
	}, [isInSettings]);

	return (
		<Modal
			open={isSettingsOpen && isInSettings}
			onCancel={closeSettings}
			footer={null}
			width="100vw"
			style={{ top: 0, padding: 0 }}
			bodyStyle={{
				height: '100vh',
				margin: 0,
				padding: 0,
			}}
			className={styles.settingsModal}
			maskStyle={{
				background: 'rgba(0, 0, 0, 0.6)',
			}}
			closable={false}
		>
			<Layout style={{ minHeight: '100vh' }} className={styles.layout}>
				<Sidebar />
				<Layout className={styles.mainContent}>
					<AppHeader />
					<Content className={styles.content}>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Modal>
	);
};

export default SettingLayout;
