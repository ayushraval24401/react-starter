import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

type DateRangePickerProps = {
	value: [Dayjs | null | undefined, Dayjs | null | undefined];
	onChange: (
		dates: [Dayjs | null | undefined, Dayjs | null | undefined],
		dateStrings: [string, string]
	) => void;
	placeholder?: [string, string];
	disabled?: boolean;
	required?: boolean;
	format?: string;
	style?: React.CSSProperties;
	className?: string;
	size?: 'large' | 'middle' | 'small';
};

const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({
	value,
	onChange,
	placeholder = ['Start Date', 'End Date'],
	disabled = false,
	required = false,
	format = 'YYYY-MM-DD',
	style,
	className,
	size = 'large',
}: DateRangePickerProps) => {
	// Ensure value is a valid 2-element tuple, even if one or both are null or undefined
	const validValue: [Dayjs | null | undefined, Dayjs | null | undefined] = [
		value[0] ? dayjs(value[0]) : undefined,
		value[1] ? dayjs(value[1]) : undefined,
	];

	return (
		<div className={className} style={style}>
			<RangePicker
				value={validValue} // Pass the tuple with the Dayjs instances or undefined
				onChange={(dates: any, dateStrings) => {
					// Handle null values in dates array
					const validDates: [
						Dayjs | null | undefined,
						Dayjs | null | undefined
					] = [
						dates[0] ? dayjs(dates[0]) : null,
						dates[1] ? dayjs(dates[1]) : null,
					];

					onChange(validDates, dateStrings);
				}}
				placeholder={placeholder}
				disabled={disabled}
				format={format}
				size={size}
			/>
			{required && <span style={{ color: 'red' }}>*</span>}
		</div>
	);
};

export default CustomDateRangePicker;
