import React, { ReactNode } from 'react';

interface BoxProps {
	children: ReactNode;
	display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'grid' | 'none';
	padding?: number | string;
	margin?: number | string;
	width?: number | string;
	height?: number | string;
	backgroundColor?: string;
	borderRadius?: number | string;
	flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	justifyContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around';
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
	gap?: number | string;
	flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
	position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
	overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
	shadow?: boolean;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
}

const Box: React.FC<BoxProps> = ({
	children,
	display = 'block',
	padding = 0,
	margin = 0,
	width = 'auto',
	height = 'auto',
	backgroundColor = 'transparent',
	borderRadius = 0,
	flexDirection = 'row',
	justifyContent = 'flex-start',
	alignItems = 'flex-start',
	gap = 0,
	flexWrap = 'nowrap',
	position = 'static',
	overflow = 'visible',
	shadow = false,
	style = {},
	className = '',
	onClick,
}) => {
	const boxStyles: React.CSSProperties = {
		display,
		padding,
		margin,
		width,
		height,
		backgroundColor,
		borderRadius,
		...(display === 'flex' && {
			flexDirection,
			justifyContent,
			alignItems,
			gap,
			flexWrap,
		}),
		position,
		overflow,
		...(shadow && {
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
		}),
		...style,
	};

	return (
		<div style={boxStyles} className={className} onClick={onClick}>
			{children}
		</div>
	);
};

export default Box;
