import React, { ChangeEvent, useState } from 'react';
import { Input, Typography, Button } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { invalidText } from 'utils/utils'; // Assuming you have some utility for validation

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
	isPassword?: boolean; // New prop to indicate if it's a password field
};

const InputField: React.FC<Props> = ({
	name,
	label,
	value,
	placeholder,
	required = false,
	isError = false,
	onChange,
	helperText = 'Invalid field',
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
	isPassword = false, // Default is false (not a password field)
}) => {
	const [hasError, setHasError] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

	const handleChange = (value: string) => {
		if (required) {
			setHasError(invalidText(value)); // Assuming invalidText is a utility function to check if a field is empty or invalid
		}

		if (regex) {
			const regexTest = new RegExp(regex);
			setHasError(!regexTest.test(value)); // Check if regex validation passes
		}

		onChange(value);
	};

	const handleBlur = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (required) {
			setHasError(invalidText(e.target.value)); // Validate on blur if required
		}

		if (regex) {
			const regexTest = new RegExp(regex);
			setHasError(!regexTest.test(e.target.value)); // Validate regex pattern on blur
		}

		if (onBlur) {
			onBlur(e); // Call the custom onBlur if provided
		}
	};

	const handleFocus = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (onFocus) {
			onFocus(e); // Call the custom onFocus if provided
		}
	};

	// Handle password visibility toggle
	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div className="input-field">
			{showLabel && label && (
				<p style={{ marginBottom: isViewOnly ? '5px' : '' }}>
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
						isPassword ? (
							// Password input with visibility toggle
							<div style={{ position: 'relative' }}>
								<Input
									name={name}
									value={value}
									placeholder={placeholder}
									status={
										isError || hasError
											? 'error'
											: undefined
									}
									prefix={prefix}
									suffix={suffix}
									width={width}
									required={required}
									disabled={disabled}
									type={showPassword ? 'text' : 'password'}
									size={size}
									style={style}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => handleChange(e.target.value)}
									onBlur={handleBlur}
									onFocus={handleFocus}
								/>
								<Button
									icon={
										showPassword ? 'eye-invisible' : 'eye'
									}
									onClick={togglePasswordVisibility}
									style={{
										position: 'absolute',
										right: '10px',
										top: '50%',
										transform: 'translateY(-50%)',
										background: 'transparent',
										border: 'none',
									}}
								/>
							</div>
						) : (
							// Regular text input
							<Input
								name={name}
								value={value}
								placeholder={placeholder}
								status={
									isError || hasError ? 'error' : undefined
								}
								prefix={prefix}
								suffix={suffix}
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
								onFocus={handleFocus}
							/>
						)
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
							onFocus={handleFocus}
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
							{helperText}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default InputField;
