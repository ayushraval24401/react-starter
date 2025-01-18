import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

type SelectDropdownProps = {
	value: string | number | undefined;
	onChange: (value: string | number) => void;
	options: { label: string; value: string | number }[];
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	style?: React.CSSProperties;
	className?: string;
	size?: 'large' | 'middle' | 'small';
	showSearch?: boolean;
	allowClear?: boolean;
	mode?: 'multiple' | 'tags' | undefined;
};

const CustomSelectDropdown: React.FC<SelectDropdownProps> = ({
	value,
	onChange,
	options,
	placeholder = 'Select',
	disabled = false,
	required = false,
	style,
	className,
	size = 'large',
	showSearch = false,
	allowClear = true,
	mode = undefined,
}: SelectDropdownProps) => {
	return (
		<div className={className} style={style}>
			<Select
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				size={size}
				showSearch={showSearch}
				allowClear={allowClear}
				mode={mode}
			>
				{options.map((option) => (
					<Select.Option key={option.value} value={option.value}>
						{option.label}
					</Select.Option>
				))}
			</Select>
			{required && <span style={{ color: 'red' }}>*</span>}
		</div>
	);
};

export default CustomSelectDropdown;
