import { Input } from 'antd';
import { ChangeEvent } from 'react';

type CustomSize = 'small' | 'middle' | 'large' | undefined;

type Props = {
	placeHolder: string;
	handleChange: (value: string) => void;
	value: string | number;
	className?: string;
	suffixIcon?: any;
	prefixIcon?: any;
	size?: CustomSize;
	minHeight?: any;
};

const SearchComponent = (props: Props) => {
	const {
		placeHolder,
		handleChange,
		value,
		className,
		prefixIcon,
		size = 'large',
		minHeight,
	} = props;

	// Handle input change
	const handleSearchChange = (value: string) => {
		handleChange(value);
	};

	return (
		<Input
			style={{ minHeight: minHeight }}
			className={className}
			placeholder={placeHolder}
			prefix={prefixIcon && prefixIcon}
			onChange={(e: ChangeEvent<HTMLInputElement>) =>
				handleSearchChange(e.target.value)
			}
			value={value}
			size={size}
		/>
	);
};

export default SearchComponent;
