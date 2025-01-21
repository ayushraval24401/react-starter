import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

type Props = {
	name: string;
	label?: string;
	value: [string, string]; // Tuple of start and end date strings
	required?: boolean;
	isError?: boolean;
	onChange: (value: [string, string]) => void; // Function receives date strings
	placeholder?: [string, string];
	helperText?: string;
	disabled?: boolean;
	disabledBeforeDates?: string; // String for date boundary
	disabledAfterDates?: string;
	className?: string;
};

const DateRangePickerField: React.FC<Props> = ({
	name,
	label,
	value,
	placeholder = ['Start Date', 'End Date'],
	className,
	isError = false,
	required = false,
	onChange,
	disabled = false,
	helperText = 'Date range is required',
	disabledBeforeDates,
	disabledAfterDates,
}) => {
	const handleChange = (
		dates: [Dayjs | null, Dayjs | null] | null,
		dateStrings: [string, string]
	) => {
		// Convert dates to strings or fallback to empty strings
		const validDates: [string, string] = dates
			? [dateStrings[0] || '', dateStrings[1] || '']
			: ['', ''];
		onChange(validDates);
	};

	const rangePresets: any = [
		{ label: 'Today', value: [dayjs(), dayjs()] },
		{
			label: 'This Week',
			value: [dayjs().startOf('week'), dayjs().endOf('week')],
		},
		{
			label: 'This Month',
			value: [dayjs().startOf('month'), dayjs().endOf('month')],
		},
		{
			label: 'Yesterday',
			value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
		},
		{
			label: 'Previous Week',
			value: [
				dayjs().subtract(1, 'week').startOf('week'),
				dayjs().subtract(1, 'week').endOf('week'),
			],
		},
		{
			label: 'Previous Month',
			value: [
				dayjs().subtract(1, 'month').startOf('month'),
				dayjs().subtract(1, 'month').endOf('month'),
			],
		},
	];

	return (
		<div className="input-field">
			{label && (
				<p className="input-label">
					{label} {required && <span className="red">*</span>}
				</p>
			)}
			<RangePicker
				style={{ width: '100%' }}
				className={className}
				name={name}
				value={[dayjs(value[0]), dayjs(value[1])]}
				onChange={handleChange}
				presets={rangePresets}
				disabled={disabled}
				format="DD/MM/YYYY"
				allowClear={false}
				placeholder={placeholder}
				disabledDate={(current: Dayjs) => {
					if (
						disabledBeforeDates &&
						current < dayjs(disabledBeforeDates)
					) {
						return true;
					}
					if (
						disabledAfterDates &&
						current > dayjs(disabledAfterDates)
					) {
						return true;
					}
					return false;
				}}
				size="large"
			/>
			{isError && <p className="input-error">{helperText}</p>}
		</div>
	);
};

export default DateRangePickerField;
