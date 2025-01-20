import React from 'react';
import { Popover as AntPopover } from 'antd';
import type { PopoverProps as AntPopoverProps } from 'antd';

export interface GlobalPopoverProps extends Omit<AntPopoverProps, 'content'> {
	content: React.ReactNode;
	children: React.ReactNode;
	placement?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'topLeft'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomRight'
		| 'leftTop'
		| 'leftBottom'
		| 'rightTop'
		| 'rightBottom';
	trigger?: 'hover' | 'focus' | 'click';
	className?: string;
	contentClassName?: string;
	overlayStyle?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	showArrow?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	destroyOnClose?: boolean;
	mouseEnterDelay?: number;
	mouseLeaveDelay?: number;
	disabled?: boolean;
}

const GlobalPopover: React.FC<GlobalPopoverProps> = ({
	content,
	children,
	placement = 'top',
	trigger = 'hover',
	className = '',
	contentClassName = '',
	overlayStyle = {},
	containerStyle = {},
	showArrow = true,
	open,
	onOpenChange,
	destroyOnClose = false,
	mouseEnterDelay = 0.1,
	mouseLeaveDelay = 0.1,
	disabled = false,
	...rest
}) => {
	const defaultOverlayStyle: React.CSSProperties = {
		maxWidth: '300px',
		...overlayStyle,
	};

	const popoverContent = (
		<div className={`popover-content ${contentClassName}`}>{content}</div>
	);

	return (
		<div style={containerStyle} className={className}>
			<AntPopover
				content={popoverContent}
				placement={placement}
				trigger={trigger}
				overlayStyle={defaultOverlayStyle}
				arrow={showArrow}
				open={disabled ? false : open}
				onOpenChange={disabled ? undefined : onOpenChange}
				destroyTooltipOnHide={destroyOnClose}
				mouseEnterDelay={mouseEnterDelay}
				mouseLeaveDelay={mouseLeaveDelay}
				{...rest}
			>
				<div className={disabled ? 'cursor-not-allowed' : ''}>
					<div className={disabled ? 'pointer-events-none' : ''}>
						{children}
					</div>
				</div>
			</AntPopover>
		</div>
	);
};

export default GlobalPopover;
