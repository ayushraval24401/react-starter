import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

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
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
		if (isOpen) return; // Ignore blur if the popup is open

		const value = (event.target as HTMLInputElement).value;

		if (required && !value) {
			setHasError(true);
			setErrorMessage(helperText);
		} else {
			setHasError(false);
			setErrorMessage('');
		}
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setIsFocused(false); // Reset focus state when the popup closes
		}
	};

	const handleChange = (date: Dayjs | null) => {
		onChange(date ? date.toISOString() : '');
	};

	const isDateDisabled = (current: Dayjs) => {
		return (
			(disabledBeforeDates &&
				current.isBefore(dayjs(disabledBeforeDates), 'day')) ||
			(disabledAfterDates &&
				current.isAfter(dayjs(disabledAfterDates), 'day')) ||
			(disableSunday && current.day() === 0)
		);
	};

	const formattedDate = value
		? dayjs(value).format(
				picker === 'year'
					? 'YYYY'
					: picker === 'month'
					? 'MMM, YYYY'
					: 'DD/MM/YYYY'
		  )
		: '';

	return (
		<div className="input-field" style={style}>
			{label && (
				<p className="input-label">
					{label} {required && <span className="red">*</span>}
				</p>
			)}

			{isViewOnly ? (
				<p>{formattedDate || 'N/A'}</p>
			) : (
				<div>
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
						onFocus={handleFocus}
						placeholder={placeholder}
						style={{ width: '100%' }}
						status={isError ? 'error' : ''}
						picker={picker}
						disabledDate={isDateDisabled}
						allowClear={false}
						onBlur={handleBlur}
						onOpenChange={handleOpenChange} // Handle popup open/close
					/>

					{(isError || hasError) && (
						<p className="input-error">
							{errorMessage || helperText}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default DatePickerField;
