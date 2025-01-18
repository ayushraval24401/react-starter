import React from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

type TimePickerProps = {
	value: Dayjs | null;
	onChange: (time: Dayjs | null, timeString: string | string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	format?: string;
	style?: React.CSSProperties;
	className?: string;
	size?: 'large' | 'middle' | 'small';
};

const CustomTimePicker: React.FC<TimePickerProps> = ({
	value,
	onChange,
	placeholder = 'Select Time',
	disabled = false,
	required = false,
	format = 'HH:mm',
	style,
	className,
	size = 'large',
}: TimePickerProps) => {
	return (
		<div className={className} style={style}>
			<TimePicker
				value={value ? dayjs(value) : null} // Ensure it's a Dayjs instance
				onChange={(time, timeString) =>
					onChange(time ? dayjs(time) : null, timeString)
				}
				placeholder={placeholder}
				disabled={disabled}
				format={format}
				size={size}
			/>
			{required && <span style={{ color: 'red' }}>*</span>}
		</div>
	);
};

export default CustomTimePicker;
