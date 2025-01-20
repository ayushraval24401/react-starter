import React, { ChangeEvent, useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	EyeInvisibleFilled,
	EyeOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

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
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
	const [minLengthValid, setMinLengthValid] = useState<boolean | null>(null);
	const [hasSpecialAndNumber, setHasSpecialAndNumber] = useState<
		boolean | null
	>(null);

	// Regular expressions for password validation
	const regexLowercase = /[a-z]/;
	const regexUppercase = /[A-Z]/;
	const regexDigit = /\d/;
	const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
	const regexLength = /.{8,16}/;

	const handleChange = (value: string) => {
		onChange(value);
		// validatePassword(value);
	};

	const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
		validatePassword(e.target.value);
	};

	const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
		if (isError) {
			setMinLengthValid(null);
			setHasSpecialAndNumber(null); // Reset error state on focus
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState); // Toggle the password visibility
	};

	// Validate password based on regex conditions
	const validatePassword = (password: string) => {
		const invalidLength = regexLength.test(password);
		const invalidChar =
			regexLowercase.test(password) &&
			regexUppercase.test(password) &&
			regexDigit.test(password) &&
			regexSpecialChar.test(password);

		setMinLengthValid(invalidLength);
		setHasSpecialAndNumber(invalidChar);

		if (invalidLength || invalidChar) {
			setHasError(true);
		}
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
					icon={
						showPassword ? <EyeInvisibleFilled /> : <EyeOutlined />
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

			{/* {(isError ||
				minLengthValid === false ||
				hasSpecialAndNumber === false) && (
				<p
					style={{
						color: 'red',
						fontSize: '12px',
						marginLeft: '2px',
					}}
				>
					{helperText}
				</p>
			)} */}

			<div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
				<div>
					<div
						style={{
							color:
								minLengthValid === true
									? 'green'
									: minLengthValid === false
									? '#ff4d4f'
									: '#b4b3b3',
						}}
					>
						{minLengthValid === true ? (
							<CheckCircleOutlined style={{ color: 'green' }} />
						) : minLengthValid === false ? (
							<CloseCircleOutlined style={{ color: '#ff4d4f' }} />
						) : (
							<InfoCircleOutlined style={{ color: '#b4b3b3' }} />
						)}
						<span style={{ marginLeft: '5px' }}>
							Password must be between 8 and 16 characters.
						</span>
					</div>
					<div
						style={{
							color:
								hasSpecialAndNumber === true
									? 'green'
									: hasSpecialAndNumber === false
									? '#ff4d4f'
									: '#b4b3b3',
						}}
					>
						{hasSpecialAndNumber === true ? (
							<CheckCircleOutlined style={{ color: 'green' }} />
						) : hasSpecialAndNumber === false ? (
							<CloseCircleOutlined style={{ color: '#ff4d4f' }} />
						) : (
							<InfoCircleOutlined style={{ color: '#b4b3b3' }} />
						)}
						<span style={{ marginLeft: '5px' }}>
							Includes capital and lowercase characters, special
							characters, and numbers.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordField;
