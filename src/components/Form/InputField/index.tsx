// components/Form/InputField.tsx
import React, { ChangeEvent, useState } from 'react';
import { Input, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { invalidText, isValidEmail } from 'utils/utils';

type Props = {
	name: string;
	label: string;
	value: string | number;
	placeholder?: string;
	required?: boolean;
	isError?: boolean;
	onChange: (value: string) => void;
	helperText?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	regex?: string;
	disabled?: boolean;
	type?: string;
	size?: SizeType;
	showLabel?: boolean;
	style?: React.CSSProperties;
	width?: string | number;
	rows?: number;
	isViewOnly?: boolean;
	onBlur?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	isPassword?: boolean;
	iconPosition?: 'prefix' | 'suffix';
	iconInLabel?: boolean;
};

const InputField: React.FC<Props> = ({
	name,
	label,
	value,
	placeholder,
	required = false,
	isError = false,
	onChange,
	helperText,
	prefix = null,
	suffix = null,
	regex,
	disabled = false,
	type = 'text',
	size = 'large',
	showLabel = true,
	style,
	width,
	rows,
	isViewOnly = false,
	onBlur,
	onFocus,
	isPassword = false,
	iconPosition = 'prefix',
	iconInLabel = false,
}) => {
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const validateField = (
		value: string
	): { isValid: boolean; message: string } => {
		// Required field validation
		if (required && invalidText(value)) {
			return { isValid: false, message: 'This field is required' };
		}

		// Email validation for email type
		if (type === 'email' && !invalidText(value)) {
			if (!isValidEmail(value)) {
				return {
					isValid: false,
					message: 'Please enter a valid email address',
				};
			}
		}

		// Custom regex validation
		if (regex && !invalidText(value)) {
			const regexTest = new RegExp(regex);
			if (!regexTest.test(value)) {
				return {
					isValid: false,
					message: helperText || 'Invalid format',
				};
			}
		}

		return { isValid: true, message: '' };
	};

	const handleChange = (value: string) => {
		// const validation = validateField(value);
		// setHasError(!validation.isValid);
		// setErrorMessage(validation.message);
		onChange(value);
	};

	const handleBlur = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const validation = validateField(e.target.value);
		setHasError(!validation.isValid);
		setErrorMessage(validation.message);

		if (onBlur) {
			onBlur(e);
		}
	};

	return (
		<div className="input-field">
			{showLabel && label && (
				<p style={{ marginBottom: isViewOnly ? '5px' : '' }}>
					{iconInLabel && (prefix || suffix) && (
						<span style={{ marginRight: '5px' }}>
							{prefix || suffix}
						</span>
					)}
					{label}{' '}
					{required && !isViewOnly && (
						<span style={{ color: 'red' }}>*</span>
					)}
				</p>
			)}

			{isViewOnly ? (
				<Typography.Text>{value}</Typography.Text>
			) : (
				<div>
					{!rows ? (
						<Input
							name={name}
							value={value}
							placeholder={placeholder}
							status={isError || hasError ? 'error' : undefined}
							prefix={
								iconPosition === 'prefix' && !iconInLabel
									? prefix
									: null
							}
							suffix={
								iconPosition === 'suffix' && !iconInLabel
									? suffix
									: null
							}
							width={width}
							required={required}
							disabled={disabled}
							type={type}
							size={size}
							style={style}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChange(e.target.value)
							}
							onBlur={handleBlur}
							onFocus={onFocus}
						/>
					) : (
						<Input.TextArea
							name={name}
							value={value}
							placeholder={placeholder}
							status={isError || hasError ? 'error' : undefined}
							rows={rows}
							required={required}
							disabled={disabled}
							size={size}
							style={style}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								handleChange(e.target.value)
							}
							onBlur={handleBlur}
							onFocus={onFocus}
						/>
					)}

					{(isError || hasError) && (
						<p
							style={{
								color: 'red',
								fontSize: '12px',
								marginLeft: '2px',
							}}
						>
							{errorMessage || helperText}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default InputField;
