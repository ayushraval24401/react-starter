import React from 'react';
import { Button, Space } from 'antd';
import { useTheme } from '../../context/ThemeContext';

interface ButtonInterface {
	text: string;
	isLoading?: boolean;
	className?: string;
	isSubmit?: boolean;
	onClick?: () => void;
	fontSize?: string;
	minWidth?: string;
	minHeight?: string;
	icon?: React.ReactNode;
	styles?: React.CSSProperties;
	size?: 'small' | 'middle' | 'large';
	disabled?: boolean;
	type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
	variant?: 'primary' | 'secondary' | 'danger' | 'default';
	ariaLabel?: string;
}

interface Prop {
	buttons: ButtonInterface[];
	gap?: number | 'small' | 'middle' | 'large';
	align?: 'start' | 'center' | 'end' | 'baseline';
	wrap?: boolean;
}

const Buttons: React.FC<Prop> = ({
	buttons,
	gap = 'middle',
	align = 'center',
	wrap = true,
}) => {
	const { currentTheme } = useTheme(); // Access theme from context

	return (
		<Space size={gap} align={align} wrap={wrap}>
			{buttons.map((button, index) => {
				// Map variant to theme colors
				const variantStyles = {
					primary: {
						backgroundColor: currentTheme.primaryColor,
						color: currentTheme.textColor,
					},
					secondary: {
						backgroundColor: currentTheme.secondaryColor,
						color: currentTheme.textColor,
					},
					danger: {
						backgroundColor: 'red',
						color: 'white',
					},
					default: {
						backgroundColor: currentTheme.cardBg,
						color: currentTheme.textSecondary,
					},
				};

				const styles = variantStyles[button.variant || 'default'];

				return (
					<Button
						key={index}
						className={button.className}
						loading={button.isLoading}
						size={button.size ?? 'middle'}
						style={{
							fontSize: button.fontSize ?? '1rem',
							minWidth: button.minWidth ?? '120px',
							minHeight: button.minHeight ?? '40px',
							...styles, // Apply variant-specific styles
							...button.styles, // Allow inline style overrides
						}}
						icon={button.icon}
						htmlType={button.isSubmit ? 'submit' : 'button'}
						onClick={button.onClick}
						disabled={button.disabled}
						type={button.type ?? 'default'}
						aria-label={button.ariaLabel ?? button.text}
					>
						{button.text}
					</Button>
				);
			})}
		</Space>
	);
};

export default Buttons;
