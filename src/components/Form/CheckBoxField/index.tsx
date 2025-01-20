import React, { ChangeEvent, useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

type Props = {
	name: string;
	label: string;
	value: string;
	placeholder?: string;
	required?: boolean;
	isError?: boolean;
	onChange: (value: string) => void;
	helperText?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	disabled?: boolean;
	size?: SizeType;
	style?: React.CSSProperties;
	showLabel?: boolean;
	width?: string | number;
};

const PasswordField: React.FC<Props> = ({
	name,
	label,
	value,
	placeholder,
	required = false,
	isError = false,
	onChange,
	helperText = 'Password is invalid',
	prefix = null,
	suffix = null,
	disabled = false,
	size = 'large',
	showLabel = true,
	style,
	width,
}) => {
	const [hasError, setHasError] = useState(false);
	const [showPassword, setShowPassword] = useState(false); 

	// Regular expressions for password validation
	const regexLowercase = /[a-z]/;
	const regexUppercase = /[A-Z]/;
	const regexDigit = /\d/;
	const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
	const regexLength = /.{8,}/;

	const handleChange = (value: string) => {
		setHasError(validatePassword(value)); 
		onChange(value);
	};

	const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
		setHasError(validatePassword(e.target.value));
	};

	const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
		if (isError) {
			setHasError(false); 
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState); 
	};

	// Validate password based on regex conditions
	const validatePassword = (password: string) => {
		return (
			!regexLowercase.test(password) ||
			!regexUppercase.test(password) ||
			!regexDigit.test(password) ||
			!regexSpecialChar.test(password) ||
			!regexLength.test(password)
		);
	};

	return (
		<div className="input-field">
			{showLabel && label && (
				<p style={{ marginBottom: '5px' }}>
					{label}{' '}
					{required && <span style={{ color: 'red' }}>*</span>}
				</p>
			)}
			<div style={{ position: 'relative' }}>
				<Input
					name={name}
					value={value}
					placeholder={placeholder}
					status={isError || hasError ? 'error' : undefined}
					prefix={prefix}
					suffix={suffix}
					width={width}
					required={required}
					disabled={disabled}
					type={showPassword ? 'text' : 'password'}
					size={size}
					style={style}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleChange(e.target.value)
					}
					onBlur={handleBlur}
					onFocus={handleFocus}
				/>
				<Button
					icon={showPassword ? 'eye-invisible' : 'eye'}
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

			<div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
				<Typography.Text type={hasError ? 'danger' : undefined}>
					Password must contain:
				</Typography.Text>
				<ul>
					<li
						style={{
							color: regexLowercase.test(value) ? 'green' : 'red',
						}}
					>
						At least one lowercase letter
					</li>
					<li
						style={{
							color: regexUppercase.test(value) ? 'green' : 'red',
						}}
					>
						At least one uppercase letter
					</li>
					<li
						style={{
							color: regexDigit.test(value) ? 'green' : 'red',
						}}
					>
						At least one digit
					</li>
					<li
						style={{
							color: regexSpecialChar.test(value)
								? 'green'
								: 'red',
						}}
					>
						At least one special character
					</li>
					<li
						style={{
							color: regexLength.test(value) ? 'green' : 'red',
						}}
					>
						At least 8 characters
					</li>
				</ul>
			</div>
		</div>
	);
};

export default PasswordField;
