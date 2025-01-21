import { InputNumber } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChangeEvent, useState, useCallback } from 'react';
import { invalidText } from 'utils/utils';

interface InputNumberFieldProps {
	name: string;
	label?: string;
	value?: number | null;
	placeholder?: string;
	required?: boolean;
	isError?: boolean;
	onChange: (value: number | null) => void;
	helperText?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	regex?: string;
	disabled?: boolean;
	size?: SizeType;
	style?: React.CSSProperties;
	allowLeadingZero?: boolean;
	onBlur?: any;
}

const InputNumberField = ({
	name,
	label,
	value,
	placeholder,
	required = false,
	isError = false,
	helperText = 'Invalid field',
	prefix,
	suffix,
	regex,
	onChange,
	disabled = false,
	size = 'large',
	style,
	onBlur,
	allowLeadingZero = false,
}: InputNumberFieldProps) => {
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(helperText);

	const validateInput = useCallback(
		(value: number | null, inputStr?: string): boolean => {
			// Check required field
			if (required && invalidText(value)) {
				setErrorMessage('This field is required');
				return false;
			}

			// Check regex if provided and we have a string value to test
			if (regex && inputStr) {
				try {
					const regexPattern = new RegExp(regex);
					if (!regexPattern.test(inputStr)) {
						setErrorMessage('Invalid format');
						return false;
					}
				} catch (e) {
					console.error('Invalid regex pattern:', e);
				}
			}

			setErrorMessage(helperText);
			return true;
		},
		[regex, required, helperText]
	);

	const handleChange = useCallback(
		(newValue: number | null) => {
			const isValid = validateInput(newValue);
			setHasError(!isValid);
			onChange(newValue);
		},
		[onChange, validateInput]
	);

	const handleBlur = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const numericValue = inputValue ? Number(inputValue) : null;
			const isValid = validateInput(numericValue, inputValue);
			setHasError(!isValid);

			if (onBlur) {
				onBlur(e);
			}
		},
		[validateInput]
	);

	const commonProps = {
		name,
		status: isError || hasError ? 'error' : ('' as any),
		placeholder,
		prefix,
		suffix,
		value,
		required,
		onChange: handleChange,
		onBlur: handleBlur,
		size,
		disabled,
		style: { width: '100%', ...style },
	};

	return (
		<div className="input-field">
			{label && (
				<p className="input-label">
					{label} {required && <span className="red">*</span>}
				</p>
			)}
			<div>
				<InputNumber
					{...commonProps}
					{...(allowLeadingZero ? { stringMode: true } : { min: 0 })}
				/>
				{(isError || hasError) && (
					<p className="input-error">{errorMessage}</p>
				)}
			</div>
		</div>
	);
};

export default InputNumberField;
