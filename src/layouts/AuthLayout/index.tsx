import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';

interface AuthLayoutProps {
	children: React.ReactNode;
	imageSrc: string; // Image path for right side
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageSrc }) => {
	return (
		<Row className={styles['auth-layout']}>
			<Col span={12} className={styles['left-section']}>
				<div className={styles['content']}>{children}</div>
			</Col>
			<Col span={12} className={styles['right-section']}>
				<img
					src={imageSrc}
					alt="Auth image"
					className={styles['image']}
				/>
			</Col>
		</Row>
	);
};

export default AuthLayout;
