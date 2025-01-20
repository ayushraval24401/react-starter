import React from 'react';
import { Tag as AntTag } from 'antd';
import { useTheme } from '../../context/ThemeContext';

interface TagProps {
	text: string;
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'default';
	icon?: React.ReactNode;
	closable?: boolean;
	onClose?: () => void;
	styles?: React.CSSProperties;
	className?: string;
}

const Tag: React.FC<TagProps> = ({
	text,
	variant = 'default',
	icon,
	closable = false,
	onClose,
	styles,
	className,
}) => {
	const { currentTheme } = useTheme(); // Access theme from context

	// Map variant to theme-specific styles
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
		success: {
			backgroundColor: 'green',
			color: 'white',
		},
		default: {
			backgroundColor: currentTheme.cardBg,
			color: currentTheme.textSecondary,
		},
	};

	const tagStyles = variantStyles[variant] || variantStyles.default;

	return (
		<AntTag
			icon={icon}
			closable={closable}
			onClose={onClose}
			className={className}
			style={{
				...tagStyles, // Apply variant-specific styles
				...styles, // Allow inline style overrides
			}}
		>
			{text}
		</AntTag>
	);
};

export default Tag;
