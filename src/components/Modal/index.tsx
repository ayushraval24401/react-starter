import React from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';

interface GlobalModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	footer?: React.ReactNode | null;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	footer = null,
}) => {
	return (
		<Modal
			open={isOpen}
			onCancel={onClose}
			title={title}
			footer={footer}
			className={styles.globalModal}
			centered
		>
			{children}
		</Modal>
	);
};

export default GlobalModal;
