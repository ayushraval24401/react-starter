import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss'; // Make sure this style file is available
import { Tooltip } from 'antd';

interface EllipseInterface {
	message: string; // Text to display
	maxLength: number | string; // Max length to truncate the text
	isTooltip?: boolean; // Whether to show a tooltip when text is truncated
	tooltipMessage?: string; // Custom tooltip message
	isLink?: boolean; // Whether the text should behave as a link
}

const Ellipse = (props: EllipseInterface) => {
	const {
		message,
		isTooltip,
		tooltipMessage,
		isLink,
		maxLength = 40,
	} = props;
	const [truncatedText, setTruncatedText] = useState(message);
	const textRef = useRef<any>(null);

	useEffect(() => {
		const handleResize = () => {
			if (textRef.current) {
				const fullText = textRef.current.textContent || ''; // Ensure content is a string
				if (fullText.length > (Number(maxLength) || 40)) {
					const truncated =
						fullText.substring(0, Number(maxLength)) + '...';
					setTruncatedText(truncated);
				} else {
					setTruncatedText(fullText); // Show full text if not exceeding maxLength
				}
			}
		};

		handleResize(); // Initial check
		window.addEventListener('resize', handleResize); // Handle resizing window for responsiveness

		return () => {
			window.removeEventListener('resize', handleResize); // Cleanup
		};
	}, [message, maxLength]);

	const containerStyles = {
		cursor: isLink ? 'pointer' : 'auto',
		color: isLink ? '#007bff' : 'inherit',
	};

	return (
		<div
			className={styles['ellipse-container']}
			ref={textRef}
			style={containerStyles}
		>
			{isTooltip ? (
				<Tooltip title={tooltipMessage || message}>
					{truncatedText}
				</Tooltip>
			) : (
				truncatedText
			)}
		</div>
	);
};

export default Ellipse;
