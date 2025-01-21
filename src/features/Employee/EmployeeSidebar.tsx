import {
	DollarOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import { Col, Row, UploadFile } from 'antd';
import Buttons, { ButtonInterface } from 'components/Button';
import CustomDatePicker from 'components/Form/DatePickerField';
import DateRangePickerField from 'components/Form/DateRangePickerField';
import GlobalUpload from 'components/Form/FileUpload';
import InputField from 'components/Form/InputField';
import {
	MultiSelectDropdown,
	SingleSelectDropdown,
} from 'components/Form/SelectDropdown';
import { FC, useState } from 'react';
import styles from './sidebar.module.scss';
import InputNumberField from 'components/Form/InputNumberField';

type SideDrawerBodyProps = {
	closeDrawerByAnimation?: any;
};

const AddEmployee: FC<SideDrawerBodyProps> = (props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [isSsnVisible, setIsSsnVisible] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const handleBlur = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log('Input blurred:', e.target.value);
	};

	const handleFocus = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log('Input focused:', e.target.value);
	};
	const { closeDrawerByAnimation } = props;

	const buttons: ButtonInterface[] = [
		{
			text: 'Cancel',
			isLoading: false,
			className: 'btn-cancel',
			isSubmit: true,
			disabled: loading,
			fontSize: '1.8rem',
			minWidth: '12rem',
			minHeight: '4rem',
			variant: 'secondary',
			onClick: () => {
				closeDrawerByAnimation();
			},
		},
		{
			text: 'Save',
			isLoading: loading,
			className: 'btn-blue',
			isSubmit: true,
			fontSize: '1.8rem',
			minWidth: '12rem',
			minHeight: '4rem',
			disabled: false,
			variant: 'primary',
			onClick: () => {},
		},
	];

	return (
		<>
			<div className={styles['side-drawer-form']}>
				<Row gutter={16} className="mb-20">
					<Col span={12}>
						<CustomDatePicker
							onChange={() => {}}
							value={''}
							picker="date"
							required
							placeholder="Select Date"
							name="birthDate"
							label="Birth Date"
						/>
					</Col>
					<Col span={12}>
						<DateRangePickerField
							name="dateRange"
							label="Select Date Range"
							value={['2024-01-01', '2024-01-10']}
							onChange={(dates) =>
								console.log('Selected range:', dates)
							}
							disabledBeforeDates="2024-01-01"
							disabledAfterDates="2024-12-31"
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-20">
					<Col span={12}>
						<InputField
							label="First Name"
							placeholder="Enter First Name"
							type="text"
							onChange={() => {}}
							value=""
							name="firstName"
							required
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
					<Col span={12}>
						<SingleSelectDropdown
							value="option1"
							options={[{ value: 'option1', label: 'Option 1' }]}
							onChange={(value) => console.log(value)}
							placeholder="Select an option"
							required={true}
							helperText="Please select an option"
							isError={false}
							label="Select Option"
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-20">
					<Col span={12}>
						<InputField
							label="Email"
							placeholder="Enter Email"
							type="email"
							onChange={() => {}}
							value=""
							name="email"
							required
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
					<Col span={12}>
						<MultiSelectDropdown
							value="option1"
							options={[{ value: 'option1', label: 'Option 1' }]}
							onChange={(value) => console.log(value)}
							placeholder="Select an option"
							required={true}
							helperText="Please select an option"
							isError={false}
							label="Select multiple  Option"
							mode="multiple"
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-20">
					<Col span={12}>
						<InputField
							name="ssn"
							label="Enter a ssn number"
							value={value}
							placeholder="123456789"
							required
							isError={false}
							onChange={handleChange}
							helperText="Must be a 9-digit number"
							regex="^\d{9}$" // Regex for exactly 9-digit numbers
							// prefix={<span>🔢</span>}
							suffix={
								<span
									onClick={() =>
										setIsSsnVisible(!isSsnVisible)
									}
									style={{ cursor: 'pointer' }}
								>
									{isSsnVisible ? (
										<EyeOutlined />
									) : (
										<EyeInvisibleOutlined />
									)}
								</span>
							}
							iconPosition="suffix"
							disabled={false}
							type="text"
							size="large"
							showLabel
							style={{ width: '100%' }}
							width="100%"
							onBlur={handleBlur}
							onFocus={handleFocus}
							isPassword={!isSsnVisible}
						/>
					</Col>
					<Col span={12}>
						<InputNumberField
							name="price"
							label="Price"
							value={0}
							onChange={() => {}}
							placeholder="0.00"
							suffix={<DollarOutlined />}
							allowLeadingZero
							required
						/>
					</Col>
				</Row>
				<Row className="mb-20">
					<Col span={24}>
						<GlobalUpload
							label="Profile Images"
							required={true} // Indicates this field is mandatory
							fileList={fileList}
							setFileList={setFileList}
							acceptedTypes={[
								'image/png',
								'image/jpeg',
								'image/jpg',
							]}
							maxFileSize={5} // Maximum file size in MB
							multiple={true} // Allow multiple files
							maxFiles={1} // Limit to 5 files
							className="custom-upload-style"
						/>
					</Col>
				</Row>
				<Row className="mb-20">
					<Col span={24}>
						<InputField
							name="description"
							label="Description"
							value={'textValue'}
							onChange={() => {}}
							placeholder="Enter a description"
							required={true}
							isError={false}
							helperText="This field is required"
							rows={4} // Use rows prop to specify the number of rows for TextArea
						/>
					</Col>
				</Row>
				<Row className="mb-20">
					<Buttons buttons={buttons} />
				</Row>
			</div>
		</>
	);
};

export default AddEmployee;
