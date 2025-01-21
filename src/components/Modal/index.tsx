import React from 'react';
import { Modal as AntdModal, Button } from 'antd';
import { ModalProps } from 'antd/es/modal';
import classNames from 'classnames';
import './GlobalModal.scss';

interface GlobalModalProps extends ModalProps {
	fullscreen?: boolean; // Custom prop for fullscreen mode
	onSubmit?: () => void; // Submit button handler
	submitText?: string; // Custom text for submit button
	cancelText?: string; // Custom text for cancel button
}

const GlobalModal: React.FC<GlobalModalProps> = ({
	fullscreen = false,
	className,
	title,
	children,
	onSubmit,
	onCancel,
	submitText = 'Submit',
	cancelText = 'Cancel',
	...props
}) => {
	return (
		<AntdModal
			{...props}
			className={classNames('global-modal', className, {
				'global-modal--fullscreen': fullscreen,
			})}
			centered
			footer={null} // Custom footer is implemented below
		>
			<div className="global-modal__header">
				<h2>{title}</h2>
			</div>
			<div className="global-modal__body">{children}</div>
			<div className="global-modal__footer">
				<Button
					onClick={onCancel}
					className="global-modal__cancel-button"
				>
					{cancelText}
				</Button>
				<Button
					type="primary"
					onClick={onSubmit}
					className="global-modal__submit-button"
				>
					{submitText}
				</Button>
			</div>
		</AntdModal>
	);
};

export default GlobalModal;
