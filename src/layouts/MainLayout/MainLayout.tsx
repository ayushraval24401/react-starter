import { Layout } from 'antd';
import React from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout>
				<AppHeader/>

				<Content
					style={{
						padding: '16px',
						background: '#f3f5f7',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
