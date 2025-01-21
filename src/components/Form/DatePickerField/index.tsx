import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type Props = {
	name: string;
	label?: string;
	value: Dayjs | string;
	required?: boolean;
	isError?: boolean;
	onChange: (value: string) => void;
	placeholder?: string;
	helperText?: string;
	disabled?: boolean;
	picker?: 'date' | 'month' | 'year';
	disabledBeforeDates?: string | Dayjs;
	disabledAfterDates?: string | Dayjs;
	isViewOnly?: boolean;
	disableSunday?: boolean;
	style?: React.CSSProperties;
};

const DatePickerField: React.FC<Props> = ({
	name,
	label,
	value,
	placeholder = 'Select date',
	isError = false,
	required = false,
	onChange,
	disabled = false,
	helperText = 'Date is required',
	picker = 'date',
	disabledBeforeDates,
	disabledAfterDates,
	isViewOnly = false,
	disableSunday = false,
	style,
}) => {
	// Format date for view-only mode
	const formattedDate = value
		? dayjs(value).format(
				picker === 'year'
					? 'YYYY'
					: picker === 'month'
					? 'MMM, YYYY'
					: 'DD/MM/YYYY'
		  )
		: '';

	// Handle date change
	const handleChange = (date: Dayjs | null) => {
		onChange(date ? date.toISOString() : '');
	};

	// Disabled date logic
	const isDateDisabled = (current: Dayjs) => {
		return (
			(disabledBeforeDates &&
				current.isBefore(dayjs(disabledBeforeDates), 'day')) ||
			(disabledAfterDates &&
				current.isAfter(dayjs(disabledAfterDates), 'day')) ||
			(disableSunday && current.day() === 0)
		);
	};

	return (
		<div className="input-field" style={style}>
			{/* Label */}
			{label && (
				<p
					className="label"
					style={{ marginBottom: isViewOnly ? '5px' : '' }}
				>
					{label}
					{required && !isViewOnly && <span className="red">*</span>}
				</p>
			)}

			{/* View-Only Mode */}
			{isViewOnly ? (
				<p>{formattedDate || 'N/A'}</p>
			) : (
				<div>
					{/* Date Picker */}
					<DatePicker
						name={name}
						value={value ? dayjs(value) : null}
						size="large"
						onChange={handleChange}
						format={
							picker === 'year'
								? 'YYYY'
								: picker === 'month'
								? 'MMM, YYYY'
								: 'DD/MM/YYYY'
						}
						disabled={disabled}
						placeholder={placeholder}
						style={{ width: '100%' }}
						status={isError ? 'error' : ''}
						picker={picker}
						disabledDate={isDateDisabled}
						allowClear={false}
					/>

					{/* Error Message */}
					{isError && (
						<p
							className="red"
							style={{ fontSize: '12px', marginLeft: '2px' }}
						>
							{helperText}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default DatePickerField;
