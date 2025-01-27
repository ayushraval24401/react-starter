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
import { hasFormError, validateFormData } from 'utils/utils';

type SideDrawerBodyProps = {
	closeDrawerByAnimation?: any;
	onSubmit?: any;
	isLoading?: boolean;
};

const dropDownOptions = [
	{ value: '', label: 'Select an option' },
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

interface FormData {
	birthDate: string;
	dateRange: [string, string];
	firstName: string;
	selectOption: string;
	email: string;
	multipleOptions: string[];
	ssn: string;
	price: number | null;
	profileImages: UploadFile[];
	description: string;
}

interface FormErrors {
	birthDate: boolean;
	dateRange: boolean;
	firstName: boolean;
	selectOption: boolean;
	email: boolean;
	multipleOptions: boolean;
	ssn: boolean;
	price: boolean;
	profileImages: boolean;
	description: boolean;
}

const AddEmployee: FC<SideDrawerBodyProps> = (props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [isSsnVisible, setIsSsnVisible] = useState<boolean>(false);
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	// Form data state
	const [formData, setFormData] = useState<FormData>({
		birthDate: '',
		dateRange: ['2024-01-01', '2024-01-10'],
		firstName: '',
		selectOption: '',
		email: '',
		multipleOptions: [''],
		ssn: '',
		price: null,
		profileImages: [],
		description: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		birthDate: false,
		dateRange: false,
		firstName: false,
		selectOption: false,
		email: false,
		multipleOptions: false,
		ssn: false,
		price: false,
		profileImages: false,
		description: false,
	});

	// Generic change handler
	const handleChange = (name: keyof FormData, value: any) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setFormErrors((prev) => ({
			...prev,
			[name]: false,
		}));
	};

	// Generic blur handler
	const { closeDrawerByAnimation, onSubmit, isLoading } = props;

	const buttons: ButtonInterface[] = [
		{
			text: 'Cancel',
			isLoading: false,
			className: 'btn-cancel',
			isSubmit: true,
			disabled: isLoading,
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
			isLoading: isLoading,
			className: 'btn-blue',
			isSubmit: true,
			fontSize: '1.8rem',
			minWidth: '12rem',
			minHeight: '4rem',
			disabled: false,
			variant: 'primary',
			onClick: () => {
				handleSubmit();
			},
		},
	];
	const handleSubmit = () => {
		let checkFormError = validateFormData(
			{
				birthDate: formData.birthDate,
				firstName: formData.firstName,
				selectOption: formData.selectOption,
				email: formData.email,
				multipleOptions: formData.multipleOptions,
				ssn: formData.ssn,
				price: formData.price,
				profileImages: formData.profileImages,
				description: formData.description,
			},
			{ ...formErrors }
		);
		if (formData.profileImages.length === 0) {
			checkFormError.profileImages = true;
		}
		setFormErrors(checkFormError as unknown as FormErrors);

		const hasError = hasFormError(checkFormError);

		if (!hasError) {
			onSubmit(formData);
		}
	};

	return (
		<>
			<div className={styles['side-drawer-form']}>
				<Row gutter={16} className="mb-10">
					<Col span={12}>
						<CustomDatePicker
							onChange={(value) =>
								handleChange('birthDate', value)
							}
							value={formData.birthDate}
							picker="date"
							required
							placeholder="Select Date"
							name="birthDate"
							label="Birth Date"
							helperText={'Please select a date'}
							isError={!!formErrors.birthDate}
						/>
					</Col>
					<Col span={12}>
						<DateRangePickerField
							name="dateRange"
							label="Select Date Range"
							value={formData.dateRange}
							onChange={(dates) =>
								handleChange('dateRange', dates)
							}
							disabledBeforeDates="2024-01-01"
							disabledAfterDates="2024-12-31"
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-10">
					<Col span={12}>
						<InputField
							label="First Name"
							placeholder="Enter First Name"
							type="text"
							onChange={(value: string) => {
								return handleChange('firstName', value);
							}}
							value={formData.firstName}
							name="firstName"
							required
							isError={!!formErrors.firstName}
							helperText={'Please enter a first name'}
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
					<Col span={12}>
						<SingleSelectDropdown
							value={formData.selectOption}
							options={dropDownOptions}
							onChange={(value) =>
								handleChange('selectOption', value)
							}
							placeholder="Select an option"
							required={true}
							helperText={'Please select an option'}
							isError={!!formErrors.selectOption}
							label="Select Option"
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-10">
					<Col span={12}>
						<InputField
							label="Email"
							placeholder="Enter Email"
							type="email"
							onChange={(value: string) =>
								handleChange('email', value)
							}
							value={formData.email}
							name="email"
							required
							isError={!!formErrors.email}
							helperText={'Please enter a valid email'}
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
					<Col span={12}>
						<MultiSelectDropdown
							value={formData.multipleOptions}
							options={dropDownOptions}
							onChange={(value) =>
								handleChange('multipleOptions', value)
							}
							placeholder="Select an option"
							required={true}
							helperText={'Please select an option'}
							isError={!!formErrors.multipleOptions}
							label="Select multiple Option"
							mode="multiple"
							style={{
								minHeight: '4rem',
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16} className="mb-10">
					<Col span={12}>
						<InputField
							name="ssn"
							label="Enter a ssn number"
							value={formData.ssn}
							placeholder="123456789"
							required
							isError={!!formErrors.ssn}
							onChange={(value: string) =>
								handleChange('ssn', value)
							}
							helperText={'Must be a 9-digit number'}
							regex="^\d{9}$"
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
							isPassword={!isSsnVisible}
						/>
					</Col>
					<Col span={12}>
						<InputNumberField
							name="price"
							label="Price"
							value={formData.price}
							onChange={(value) => handleChange('price', value)}
							placeholder="0.00"
							suffix={<DollarOutlined />}
							allowLeadingZero
							required
							isError={!!formErrors.price}
							helperText={'Please enter a valid price'}
						/>
					</Col>
				</Row>
				<Row className="mb-10">
					<Col span={24}>
						<GlobalUpload
							label="Profile Images"
							required={true}
							fileList={fileList}
							setFileList={(files: any) => {
								setFileList(files);
								handleChange('profileImages', files);
							}}
							acceptedTypes={[
								'image/png',
								'image/jpeg',
								'image/jpg',
							]}
							maxFileSize={5}
							multiple={true}
							maxFiles={1}
							className="custom-upload-style"
							isError={!!formErrors.profileImages}
						/>
					</Col>
				</Row>
				<Row className="mb-10">
					<Col span={24}>
						<InputField
							name="description"
							label="Description"
							value={formData.description}
							onChange={(value: string) =>
								handleChange('description', value)
							}
							placeholder="Enter a description"
							required={true}
							isError={!!formErrors.description}
							helperText={'Please enter a description'}
							rows={4}
						/>
					</Col>
				</Row>
				<Row className="mb-10">
					<Buttons buttons={buttons} />
				</Row>
			</div>
		</>
	);
};

export default AddEmployee;
