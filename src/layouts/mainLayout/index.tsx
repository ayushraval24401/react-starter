import { Layout } from 'antd';
import AppHeader from 'components/Layout/MainLayout/Header';
import Sidebar from 'components/Layout/MainLayout/Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
const { Content } = Layout;

const MainLayout = () => {
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
