import React from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment';

type DatePickerProps = {
	value: Moment | null;
	onChange: (date: Moment | null, dateString: string | string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	format?: string;
	required?: boolean;
	style?: React.CSSProperties;
	className?: string;
	size?: 'large' | 'middle' | 'small';
};

const CustomDatePicker: React.FC<DatePickerProps> = ({
	value,
	onChange,
	placeholder = 'Select Date',
	disabled = false,
	format = 'YYYY-MM-DD',
	required = false,
	style,
	className,
	size = 'large',
}: DatePickerProps) => {
	return (
		<div className={className} style={style}>
			<DatePicker
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				format={format}
				size={size}
			/>
			{required && <span style={{ color: 'red' }}>*</span>}
		</div>
	);
};

export default CustomDatePicker;
