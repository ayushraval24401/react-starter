//src/layouts/MainLayout/AppHeader.tsx
import {
	CloseOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Modal, Space, Tooltip } from 'antd';
import ThemeSwitch from 'components/ThemeSwitch';
import React, { useState } from 'react';
import './index.scss';

const { Header } = Layout;

const AppHeader: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<Header className="header">
				<Space size="large" className="actions">
					<Tooltip title="Profile">
						<Avatar icon={<UserOutlined />} />
					</Tooltip>
					<Tooltip title="Settings">
						<SettingOutlined
							onClick={openModal}
							style={{ fontSize: '20px', cursor: 'pointer' }}
						/>
					</Tooltip>
					<Tooltip title="Logout" placement="bottomLeft">
						<LogoutOutlined
							style={{ fontSize: '20px', cursor: 'pointer' }}
						/>
						<ThemeSwitch />
					</Tooltip>
				</Space>
			</Header>

			{/* Fullscreen Modal */}
			<Modal
				open={isModalOpen}
				footer={null}
				closable={false}
				width="100vw"
				style={{ top: 0, padding: 0 }}
				bodyStyle={{
					height: '100vh',
					margin: 0,
					padding: 0,
					display: 'flex',
					flexDirection: 'column',
				}}
				className="fullScreenModal"
				maskStyle={{
					background: 'rgba(0, 0, 0, 0.6)', // Optional for darkened background
				}}
			>
				<div className="modalHeader">
					<h1>header</h1>
					<Button
						type="text"
						icon={<CloseOutlined />}
						onClick={closeModal}
						className="closeButton"
					/>
				</div>
				<div className="modalContent">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Pellentesque accumsan sagittis magna, et commodo neque
						fermentum sed. Nulla facilisi.
					</p>
					<p>
						Quisque venenatis, mi vel euismod fringilla, nisi risus
						feugiat risus, vel cursus ex lorem sit amet massa. Proin
						non augue lectus.
					</p>
					<p>
						Vestibulum auctor turpis at libero vehicula, at pharetra
						erat lacinia. Integer viverra urna in nisi facilisis
						vehicula.
					</p>
				</div>
			</Modal>
		</>
	);
};

export default AppHeader;
