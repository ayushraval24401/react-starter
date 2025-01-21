import { Col, Popover, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { invalidText } from 'utils/utils';

type CommonProps = {
	value: string | string[] | null;
	options: any[];
	onChange: (value: string | number | string[]) => void;
	placeholder: string;
	required: boolean;
	helperText: string;
	label?: string;
	isError: boolean;
	size?: 'small' | 'middle' | 'large';
	width?: string | number;
	className?: string;
	labelSuffix?: any;
	labelSuffixContent?: any;
	disabled?: boolean;
	loading?: boolean;
	isViewOnly?: boolean;
	style?: any;
	extraLabel?: any;
};

type SingleSelectProps = CommonProps & {
	mode?: undefined;
};

type MultiSelectProps = CommonProps & {
	mode: 'multiple' | 'tags';
};

const SingleSelectDropdown = (props: SingleSelectProps) => {
	const {
		value,
		options,
		placeholder,
		size = 'middle',
		required,
		helperText = 'Field required',
		onChange,
		label,
		isError,
		className,
		labelSuffix,
		width,
		labelSuffixContent,
		disabled = false,
		loading = false,
		isViewOnly = false,
		style,
		extraLabel,
	} = props;

	const [hasError, setHasError] = useState(false);

	const handleChange = (value: string) => {
		if (required && typeof value === 'string') {
			setHasError(invalidText(value));
		} else {
			setHasError(false);
		}
		onChange(value);
	};

	useEffect(() => {
		setHasError(false);
	}, [options]);

	return (
		<div className="input-field">
			<div style={{ ...style }}>
				{label && (
					<p
						className="label"
						style={{
							marginRight: '4px',
							marginBottom: `${isViewOnly ? '5px' : ''}`,
						}}
					>
						{label}{' '}
						{required && !isViewOnly && (
							<span className="red">*</span>
						)}
						{extraLabel && <>{extraLabel}</>}
						<Popover
							content={labelSuffixContent}
							trigger="hover"
							className="cursor-pointer"
						>
							{labelSuffix}
						</Popover>
					</p>
				)}
				<Select
					showSearch
					optionFilterProp="label"
					value={value}
					options={options}
					onChange={(value) => handleChange(value as string)}
					size={size}
					placeholder={placeholder}
					status={hasError || isError ? 'error' : ''}
					style={{ width: width ?? '100%', ...style }}
					disabled={disabled}
					loading={loading}
				/>
				{(hasError || isError) && (
					<p
						className="red"
						style={{ fontSize: '12px', marginLeft: '2px' }}
					>
						{helperText}
					</p>
				)}
			</div>
		</div>
	);
};

const MultiSelectDropdown = (props: MultiSelectProps) => {
	const {
		value,
		options,
		placeholder,
		size = 'middle',
		required,
		helperText = 'Field required',
		onChange,
		label,
		isError,
		className,
		labelSuffix,
		width,
		labelSuffixContent,
		disabled = false,
		loading = false,
		isViewOnly = false,
		style,
		extraLabel,
	} = props;

	const [hasError, setHasError] = useState(false);

	const handleChange = (value: string[]) => {
		if (required && Array.isArray(value) && value.length === 0) {
			setHasError(true);
		} else {
			setHasError(false);
		}
		onChange(value);
	};

	useEffect(() => {
		setHasError(false);
	}, [options]);

	return (
		<div className="input-field">
			<div>
				{label && (
					<p
						className="label"
						style={{
							marginRight: '4px',
							marginBottom: `${isViewOnly ? '5px' : ''}`,
						}}
					>
						{label}{' '}
						{required && !isViewOnly && (
							<span className="red">*</span>
						)}
						{extraLabel && <>{extraLabel}</>}
						<Popover
							content={labelSuffixContent}
							trigger="hover"
							className="cursor-pointer"
						>
							{labelSuffix}
						</Popover>
					</p>
				)}
				<Select
					mode="multiple"
					showSearch
					optionFilterProp="label"
					value={value}
					options={options}
					onChange={(value) => handleChange(value as string[])}
					size={size}
					placeholder={placeholder}
					maxTagCount="responsive"
					status={hasError || isError ? 'error' : ''}
					style={{ width: width ?? '100%', ...style }}
					disabled={disabled}
					loading={loading}
				/>
				{(hasError || isError) && (
					<p
						className="red"
						style={{ fontSize: '12px', marginLeft: '2px' }}
					>
						{helperText}
					</p>
				)}
			</div>
		</div>
	);
};

export { SingleSelectDropdown, MultiSelectDropdown };
