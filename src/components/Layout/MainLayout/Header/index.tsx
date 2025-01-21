//src/layouts/MainLayout/AppHeader.tsx
import {
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Space, Tooltip } from 'antd';
import ThemeSwitch from 'components/ThemeSwitch';
import { useSettings } from 'context/SettingsContext';
import React from 'react';
import './index.scss';

const { Header } = Layout;

const AppHeader: React.FC = () => {
	const { toggleSettings } = useSettings();

	return (
		<>
			<Header className="header">
				<Space size="large" className="actions">
					<Tooltip title="Profile">
						<Avatar icon={<UserOutlined />} />
					</Tooltip>
					<Tooltip title="Settings">
						<SettingOutlined
							onClick={toggleSettings}
							style={{ fontSize: '20px', cursor: 'pointer' }}
						/>
					</Tooltip>
					<Tooltip title="Logout" placement="bottomLeft">
						<LogoutOutlined
							style={{ fontSize: '20px', cursor: 'pointer' }}
						/>
					</Tooltip>
					<ThemeSwitch />
				</Space>
			</Header>
		</>
	);
};

export default AppHeader;
