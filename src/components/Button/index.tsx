import { Button, Space } from 'antd';
import React from 'react';

interface ButtonInterface {
	text: string;
	isLoading?: boolean;
	className?: string;
	isSubmit?: boolean;
	onclick?: () => void;
	fontSize?: string;
	minWidth?: string;
	minHeight?: string;
	icon?: React.ReactNode;
	styles?: React.CSSProperties;
	size?: 'small' | 'middle' | 'large';
	disabled?: boolean;
	type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
	ariaLabel?: string;
}

interface Prop {
	buttons: ButtonInterface[];
	gap?: number | 'small' | 'middle' | 'large';
	align?: 'start' | 'center' | 'end' | 'baseline';
	wrap?: boolean;
}

const Buttons = (props: Prop) => {
	const { buttons, gap = 'middle', align = 'center', wrap = true } = props;

	return (
		<Space size={gap} align={align} wrap={wrap}>
			{buttons.map((button: ButtonInterface, index: number) => (
				<Button
					key={index} // Using index as key; replace with unique ID for production
					className={button.className}
					loading={button.isLoading}
					size={button.size ?? 'middle'}
					style={{
						fontSize: button.fontSize ?? '1rem',
						minWidth: button.minWidth ?? '120px',
						minHeight: button.minHeight ?? '40px',
						...button.styles,
					}}
					icon={button.icon}
					htmlType={button.isSubmit ? 'submit' : 'button'}
					onClick={button.onclick}
					disabled={button.disabled}
					type={button.type ?? 'default'}
					aria-label={button.ariaLabel ?? button.text}
				>
					{button.text}
				</Button>
			))}
		</Space>
	);
};

export default Buttons;
