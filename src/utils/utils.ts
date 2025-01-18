import dayjs from 'dayjs';
import { parse } from 'mathjs';
import toast from 'react-hot-toast';
import { parseISO, startOfDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import CryptoJS from 'crypto-js';
import Papa from 'papaparse';

const encryptionKey: any = process.env.REACT_APP_ENCRYPTION_KEY;
const stanbicEncryptionKey: any = process.env.REACT_APP_STANBIC_ENCRYPTION_KEY;

export const toastText = (message: string, type: string) => {
	switch (type) {
		case 'success':
			toast.success(message, {
				style: {
					fontSize: '16px',
				},
			});

			break;

		case 'error':
			toast.error(message, {
				style: {
					fontSize: '16px',
				},
			});
			break;
		case 'info':
			toast(message, {
				style: {
					fontSize: '16px',
					backgroundColor: '#f0f8ff',
					color: '#000',
				},
			});
			break;
	}
};

export function invalidText(value: string | number | null | undefined) {
	return (
		value === null ||
		value === undefined ||
		value.toString().trim().length === 0
	);
}

export function base64ToBlob(base64: string, mime: string) {
	const byteCharacters = atob(base64);
	const arrayBuffer = new ArrayBuffer(byteCharacters.length);
	const uint8Array = new Uint8Array(arrayBuffer);
	for (let i = 0; i < byteCharacters.length; i++) {
		uint8Array[i] = byteCharacters.charCodeAt(i);
	}
	return new Blob([uint8Array], { type: mime });
}

export const deepCopy = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export const formatPhoneNumber = (phoneNumber: string) => {
	// Remove all non-numeric characters from the input
	const cleanedNumber = phoneNumber.replace(/\D/g, '');

	// Define the phone number format (e.g., "(XXX) XXX-XXXX")
	const format = '($1) $2-$3';

	// Apply the mask to the cleaned number using a regular expression
	const maskedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, format);

	return maskedNumber;
};

export const phoneNumberFormatHandler = (phoneNumber: any = '') => {
	const inputPhoneNumber = phoneNumber?.replace(/\D/g, ''); // Remove non-digit characters
	let formattedPhoneNumber = '';

	if (inputPhoneNumber.length > 0) {
		formattedPhoneNumber = `(${inputPhoneNumber.slice(0, 3)}`;

		if (inputPhoneNumber.length >= 4) {
			formattedPhoneNumber += `) ${inputPhoneNumber.slice(3, 6)}`;
		}

		if (inputPhoneNumber.length >= 7) {
			formattedPhoneNumber += `-${inputPhoneNumber.slice(6, 10)}`;
		}
	}

	return formattedPhoneNumber;
};

export const getPeriodCategory = (hubspotDate: any) => {
	const today: any = new Date();

	const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

	const timeDifferenceInWeeks = Math.round(
		(today - hubspotDate) / millisecondsPerWeek
	);

	let category = '';

	if (timeDifferenceInWeeks <= 4) {
		category = '1st 4 weeks';
	} else if (timeDifferenceInWeeks <= 6) {
		category = '4 weeks until 6 weeks';
	} else if (timeDifferenceInWeeks <= 8) {
		category = '6 weeks until 8 weeks';
	} else if (timeDifferenceInWeeks <= 12) {
		category = '8 weeks until 12 weeks';
	} else if (timeDifferenceInWeeks <= 24) {
		category = '12 weeks until 24 weeks';
	} else if (timeDifferenceInWeeks <= 36) {
		category = '24 weeks until 36 weeks';
	} else if (timeDifferenceInWeeks <= 52) {
		category = '36 weeks until 52 weeks';
	} else {
		category = 'More than 52 weeks';
	}
	return category;
};

export const addCommasToNumber = (number: any) => {
	if (number) {
		const parts = number?.toString().split('.');
		if (parts && parts.length > 0) {
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return parts.join('.');
		}
	} else {
		return '0';
	}
};

export const getPermissionObject = (
	permissionObj: any,
	allPermissions: any
) => {
	let formattedArray: any = [];
	const updatedAllPermission = allPermissions.map((singlePermission: any) => {
		return {
			...singlePermission,
			isBold: false,
		};
	});

	// const updatedPermissionObj = []
	for (const singlePermissionObj of permissionObj) {
		let tempArray = [];
		if (singlePermissionObj.name) {
			tempArray.push({
				moduleName: singlePermissionObj.name,
				isBold: true,
			});
		}

		const filteredPermissions = updatedAllPermission.filter(
			(singlePermission: any) => {
				return singlePermissionObj.items.includes(
					singlePermission.sortId
				);
			}
		);
		tempArray = [...tempArray, ...filteredPermissions];
		formattedArray = [...formattedArray, ...tempArray];
	}

	return formattedArray;
};

export const checkPermission = (
	allPermissions: any,
	requiredPermission: any
) => {
	if (!allPermissions) {
		return false;
	}
	const permissionsList = allPermissions;
	const permission = permissionsList?.find(
		(singlePermission: any) =>
			singlePermission.moduleName === requiredPermission.permissionName
	);

	if (permission) {
		const permitted = requiredPermission.permission.some(
			(singlePermission: string) => permission[singlePermission]
		);
		return permitted || permission['all'];
	} else {
		return false;
	}
};

export const permissionObject = [
	{
		items: [1, 2],
	},
	{
		name: 'Employee',
		items: [3, 3.1, 4, 5, 7, 7.01, 7.02],
	},
	{
		name: 'Time Activities',
		items: [7.1, 7.2, 7.3, 7.4, 7.5],
	},
	{
		name: 'Configurations',
		// items: [12, 19.2, 19.3, 17, 13, 19.1, 14, 18, 19, 19.4, 19.5],
		items: [12, 19.2, 19.3, 17, 13, 19.1, 14, 19.4, 19.5],
	},
	{
		name: 'Approvals',
		items: [9, 10, 11],
	},
	{
		name: 'Payroll',
		items: [23, 24, 25, 25.1, 26],
	},
	{
		name: 'Payroll Settings',
		items: [27, 27.1, 28, 28.1, 29, 30, 31, 32, 33],
	},
	{
		name: 'Reports',
		items: [20, 21, 22],
	},
];

export const PermissionDataSource: any = [
	{
		moduleName: 'Basic & Personal Details',
		sortId: 1,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Salary Details',
		sortId: 2,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Employee Payment Information',
		sortId: 3,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Employee Loan',
		sortId: 4,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Employee Declarations',
		sortId: 5,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Run Payroll',
		sortId: 6,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Reimbursements',
		sortId: 7,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Proof Of Investments',
		sortId: 8,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Salary Revision',
		sortId: 9,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Branch Code',
		sortId: 10,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Departments',
		sortId: 11,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Job Grade',
		sortId: 12,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Payment Type',
		sortId: 13,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Payment Method',
		sortId: 14,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Pay Point',
		sortId: 15,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Earning',
		sortId: 16,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Deduction',
		sortId: 17,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Payroll Reports',
		sortId: 18,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Earning and Deduction Reports',
		sortId: 19,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
	{
		moduleName: 'Tax Reports',
		sortId: 20,
		all: false,
		view: false,
		edit: false,
		delete: false,
		add: false,
	},
];

export function validateFormData(
	dataObj: { [key: string]: any },
	errObj: { [key: string]: boolean }
): { [key: string]: boolean } {
	Object.keys(dataObj).forEach((key) => {
		if (Object.hasOwn(errObj, key)) {
			errObj[key] = invalidText(dataObj[key]);
		}
	});

	return errObj;
}

export function hasFormError(errObj: { [key: string]: boolean }): boolean {
	return Object.keys(errObj).some((key) => {
		return errObj[key];
	});
}
export const configurationModules = [
	'branch code',
	'category code',
	'company',
	'departments',
	'pay point',
	'job grade',
	'cost center',
	'job title',
	// 'earning',
	// 'deduction',
	'holidays',
	'leave management',
];
export const payrollSettingsModules = [
	'company setup',
	'pay period',
	'pay schedule',
	'payroll history',
	'statutory components',
	'mid-month pay',
	'deduction code',
	'earning code',
];
export function getAllowedPermissions(modules: any) {
	let allowedPermissions: any = [];

	let allowConfiguration = false;
	let allowPayrollSettings = false;
	modules?.forEach((module: any) => {
		const { moduleName, add, view, edit, approval, delete: del } = module;

		const _moduleName =
			moduleName.split(' ').length > 1
				? moduleName.split(' ')?.join('_')
				: moduleName;
		if (add) {
			allowedPermissions.push(`Add_${_moduleName}`);
		}
		if (edit) {
			allowedPermissions.push(`Edit_${_moduleName}`);
		}
		if (del) {
			allowedPermissions.push(`Delete_${_moduleName}`);
		}
		if (view) {
			allowedPermissions.push(`View_${_moduleName}`);
		}
		if (approval) {
			allowedPermissions.push(`Approval_${_moduleName}`);
		}
		if (add || view || edit || del || approval) {
			allowedPermissions.push(`Allow_${_moduleName}`);
		}
		if (
			configurationModules.includes(moduleName.toLowerCase()) &&
			(add || view || edit || del || approval)
		) {
			allowConfiguration = true;
		}
		if (
			payrollSettingsModules.includes(moduleName.toLowerCase()) &&
			(add || view || edit || del || approval)
		) {
			allowPayrollSettings = true;
		}
	});
	if (allowPayrollSettings) {
		allowedPermissions.push(`Allow_Payroll_Settings`);
	}
	if (allowConfiguration) {
		allowedPermissions.push(`Allow_Configuration`);
	}

	return allowedPermissions;
}

export function getAllowedModule(permissions: any, modules: any) {
	let _moduleName = null;
	for (let module of modules) {
		const _module = permissions.find(
			(per: any) => per.moduleName === module
		);

		if (_module) {
			const {
				moduleName,
				add,
				view,
				edit,
				approval,
				delete: del,
			} = _module;

			if (add || view || edit || del || approval) {
				_moduleName = moduleName;
				break;
			}
		}
	}

	return _moduleName;
}

export function formatChanges(changes: any) {
	if (!changes || typeof changes !== 'object') {
		throw new Error('Invalid input: changes must be an object');
	}

	// Destructure the message property from the changes object
	const { message } = changes;

	if (!message || typeof message !== 'object') {
		throw new Error('Invalid input: changes.message must be an object');
	}

	// Map over the entries of the message object and create a formatted string for each change
	const formattedChanges = Object.entries(message)
		.map(([field, item]: any) => {
			let oldValue = item?.oldValue;
			let newValue = item?.newValue;

			if (
				field === 'dateOfBirth' ||
				field === 'joiningDate' ||
				field === 'terminationDate'
			) {
				if (oldValue && oldValue !== 'NA') {
					oldValue = dayjs(oldValue).format('DD/MM/YYYY');
					newValue = dayjs(newValue).format('DD/MM/YYYY');
				} else {
					oldValue = 'NA';
					newValue = dayjs(newValue).format('DD/MM/YYYY');
				}
			}

			if (item.isSelectField) {
				oldValue = item?.oldValueName;
				newValue = item?.newValueName;
			}

			return `${
				fieldNameMapping[field as keyof typeof fieldNameMapping]
			} <span class="color-purple">from </span> ${oldValue} <span class="color-purple">to</span> ${newValue}`;
		})
		.join('<span class="color-purple">, </span> ');

	return formattedChanges;
}

export const fieldNameMapping = {
	firstName: 'First Name',
	lastName: 'Last Name',
	dateOfBirth: 'Date of Birth',
	gender: 'Gender',
	country: 'Country',
	maritalStatus: 'Marital Status',
	joiningDate: 'Joining Date',
	branchId: 'Branch ID',
	branch: 'Branch Code',
	departmentId: 'Department ID',
	department: 'Department',
	costCenterId: 'Cost Center ID',
	costCenter: 'Cost Center',
	categoryId: 'Category ID',
	category: 'Category',
	jobGradeId: 'Job Grade ID',
	jobGrade: 'Job Grade',
	staffCode: 'Staff Code',
	ssn: 'SSN',
	passportNo: 'Passport Number',
	nationalRegistrationNo: 'National Registration Number',
	recordStatus: 'Record Status',
	employeeTPIN: 'Employee TPIN',
	currency: 'Currency',
	taxationMethod: 'Taxation Method',
	employmentType: 'Employment Type',
	isCompensationFund: 'Is Compensation Fund',
	napsaPaidBy: 'NAPSA Paid By',
	enableGrossUpTax: 'Enable Gross Up Tax',
	disabilities: 'Disabilities',
	grossUpAllEarnings: 'Gross Up All Earnings',
	terminationDate: 'Termination Date',
	earnings: 'Earnings',
	monthlySalary: 'Monthly Salary',
	hourlySalary: 'Hourly Salary',
	midMonthSalary: 'Mid Month Salary',
	effectiveStartDate: 'Effective Date',
	notes: 'Notes',
	'Salary Details': 'Monthly Salary',
	supervisorIds: 'Supervisor',
	payPoint: 'Pay Point',
	location: 'Location',
	name: 'Name',
	description: 'Description',
	maximumLeavePerMonth: 'Maximum Leave Per Month',
	attachmentRequired: 'Attactment Required',
	leaveEncashment: 'Leave Encashment',
	percentageOfDeduction: 'Percentage of Deduction',
	amount: 'Amount',
	formula: 'Formula',
	holidayName: 'Holiday Name',
	holidayDate: 'Holiday Date',
	code: 'Code',
	accNo: 'Account Number',
	seqNo: 'Sequence Number',
	percent: 'Percent',
	function: 'Function',
	displayName: 'Name',
};

export const sectionMapping = {
	PERSONAL_DETAILS: 'Personal Details',
	TAXATION_DETAILS: 'Taxation Details',
	EMPLOYEE_DETAILS: 'Employee Details',
	IDENTIFICATION_DETAILS: 'Identification Details',
	EARNINGS: 'Earnings',
	DEDUCTION: 'Deduction',
	SALARY_DETAILS: 'Salary Details',
	PAY_POINT: 'Pay Point',
	LEAVE_MANAGEMENT: 'Leave Management',
	DEDUCTION_CODE: 'Deduction Code',
	HOLIDAY: 'Holiday',
	EARNING_CODE: 'Earning Codes',
};

export const taxationMethodMapping = {
	CONTRIBUTE_TO_CHARITY: 'Contribute to Charity',
	CUMULATIVE_BASIS: 'Cumulative Basis',
	DAILY_TAX: 'Daily Tax',
	TAX_EXEMPT: 'Tax Exempt',
};

export function formatToDateOnly(date: any) {
	// Convert to Day.js object and set the time to 00:00:00
	const dateOnly = dayjs(date).startOf('day');
	// Format to date-only string (e.g., 'YYYY-MM-DD')
	return dateOnly.format('YYYY-MM-DD');
}
export const removeEmptyValues = (obj: any) => {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) => value !== null && value !== undefined
		)
	);
};

export function extractVariables(node: any, variables = new Set<string>()) {
	if (node.isSymbolNode) {
		variables.add(node.name);
	} else if (node.args) {
		node.args.forEach((arg: any) => extractVariables(arg, variables));
	}

	return Array.from(variables); // Convert Set to an array using Array.from()
}
export const validateFormula = (
	formula: string,
	allowedVariables: string[]
): boolean => {
	try {
		const node = parse(formula);
		const variables = extractVariables(node);

		for (const variable of variables) {
			if (!allowedVariables.includes(variable)) {
				return false;
			}
		}

		return true;
	} catch (error) {
		return false;
	}
};

export const allowedVariablesForEarningsFormula = [
	'SAL',
	'OTH',
	'BSP',
	'LVD',
	'NMW',
];

export function compareArrays(array1: any, array2: any) {
	const map2 = new Map(array2.map((obj: any) => [obj.id, obj]));

	function objectsDiffer(obj1: any, obj2: any) {
		for (const key in obj1) {
			if (obj1[key] !== obj2[key]) {
				return true;
			}
		}
		return false;
	}

	const differingObjectsFromArray1: any = [];
	const differingObjectsFromArray2: any = [];

	array1.forEach((obj1: any) => {
		const obj2 = map2.get(obj1.id);
		if (obj2 && objectsDiffer(obj1, obj2)) {
			differingObjectsFromArray1.push(obj1);
			differingObjectsFromArray2.push(obj2);
		}
	});

	return {
		fromArray1: differingObjectsFromArray1,
		fromArray2: differingObjectsFromArray2,
	};
}

export function compareObjects(obj1: any, obj2: any) {
	// Array to store the differences
	const differences: any = [];

	// Get all keys from both objects
	const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

	// Iterate through each key
	allKeys.forEach((key) => {
		const value1 = obj1[key];
		const value2 = obj2[key];

		// Check if the values are different
		if (value1 !== value2) {
			differences.push({ key, value1, value2 });
		}
	});

	return differences;
}

export function timeStringToMinutes(timeString: string) {
	const [hours, minutes] =
		!invalidText(timeString) && timeString?.includes(':')
			? timeString.split(':').map(Number)
			: [0, 0];
	return hours * 60 + minutes;
}

export function minutesToTimeString(totalMinutes: number) {
	const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
	const minutes = String(totalMinutes % 60).padStart(2, '0');
	return `${hours}:${minutes}`;
}

export function checkSunday(date: string) {
	const dateObject = new Date(date);
	const dayOfWeek = dateObject.getDay();
	return dayOfWeek === 0;
}

export function checkHoliday(date: Date, holidays: any[]): boolean {
	return holidays.find((holiday) => {
		const _holidayDate = new Date(holiday.holidayDate);
		const _date = new Date(date);

		_holidayDate.setHours(0, 0, 0, 0);
		_date.setHours(0, 0, 0, 0);

		return _holidayDate.getTime() === _date.getTime();
	});
}

export const formatDateToDisplay = (isoString: string) => {
	const utcDate = parseISO(isoString);
	const startOfUTCDate = startOfDay(utcDate); // Set time to 00:00:00
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's local time zone

	// Format the date in the user's local time zone
	const formattedDate = formatInTimeZone(
		startOfUTCDate,
		timeZone,
		'dd/MM/yyyy'
	);

	return formattedDate;
};

export function formatNumber(
	number: number,
	data: any,
	isUsd?: boolean,
	isCurrency: boolean = true
) {
	let currency;
	if (isUsd) {
		currency = data?.find((item: any) => item.currency === 'USD');
	} else {
		currency = data?.find((item: any) => item.currency === 'ZMW');
	}

	if (invalidText(currency)) {
		return number;
	}

	const {
		currencyPosition,
		decimalSeparator,
		displayFormat,
		negativeDisplay,
		symbol,
		thousandSeparator,
	} = currency;

	// Helper function to format numbers with commas (1,234,567) or Indian format (12,34,567)
	const formatWithSeparator = (num: any, separator: any, format: any) => {
		if (format === 1) {
			// Standard format: 1,234,567
			return num.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
		} else if (format === 2) {
			// Indian format: 12,34,567
			let x = num.split('.');
			let lastThree = x[0].slice(-3);
			let otherNumbers = x[0].slice(0, -3);
			if (otherNumbers !== '') {
				lastThree = separator + lastThree;
			}
			otherNumbers = otherNumbers.replace(
				/\B(?=(\d{2})+(?!\d))/g,
				separator
			);
			x[0] = otherNumbers + lastThree;
			return x.join('.');
		}
		return num;
	};

	// Determine if number is negative and handle accordingly
	let isNegative = number < 0;
	let absNumber = Math.abs(number).toFixed(decimalSeparator);

	// Use the correct thousand separator
	let separator = thousandSeparator === 'COMA' ? ',' : '.';

	// Split the number to handle the decimal part separately
	let [wholePart, decimalPart] = absNumber.split('.');

	// Format the whole number part based on displayFormat
	let formattedNumber = formatWithSeparator(
		wholePart,
		separator,
		displayFormat
	);

	// Add decimal part if applicable
	if (decimalPart) {
		formattedNumber += '.' + decimalPart;
	}

	// Handle negative numbers display
	if (isNegative) {
		if (negativeDisplay === 'MINUS') {
			formattedNumber = `-${formattedNumber}`;
		} else if (negativeDisplay === 'BRACKET') {
			formattedNumber = `(${formattedNumber})`;
		}
	}

	// Handle currency position
	if (isCurrency) {
		if (currencyPosition === 'BEFORE') {
			formattedNumber = `${symbol} ${formattedNumber}`;
		} else if (currencyPosition === 'AFTER') {
			formattedNumber = `${formattedNumber} ${symbol}`;
		}
	}

	return formattedNumber;
}

export const payPeriodNameFn = (startDate: string, endDate: string) => {
	const start = dayjs(startDate, 'DD-MM-YYYY');
	const end = dayjs(endDate, 'DD-MM-YYYY');

	const startMonthEnd = start.endOf('month');
	const daysInStartMonth = startMonthEnd.isBefore(end)
		? startMonthEnd.diff(start, 'day') + 1
		: end.diff(start, 'day') + 1;

	const endMonthStart = end.startOf('month');
	const daysInEndMonth = end.diff(endMonthStart, 'day') + 1;

	const hasMoreDaysInStartMonth = daysInStartMonth > daysInEndMonth;
	const dominantMonth = hasMoreDaysInStartMonth
		? start.format('MMMM')
		: end.format('MMMM');

	return `${dominantMonth} (${start.format('DD/MM/YYYY')} - ${end.format(
		'DD/MM/YYYY'
	)})`;
};

export const dominantMonth = (startDate: Date, endDate: Date) => {
	const start = dayjs(startDate);

	const end = dayjs(endDate);

	const startMonthEnd = start.endOf('month');
	const daysInStartMonth = startMonthEnd.isBefore(end)
		? startMonthEnd.diff(start, 'day') + 1
		: end.diff(start, 'day') + 1;

	const endMonthStart = end.startOf('month');
	const daysInEndMonth = end.diff(endMonthStart, 'day') + 1;

	const hasMoreDaysInStartMonth = daysInStartMonth > daysInEndMonth;
	const dominantMonth = hasMoreDaysInStartMonth
		? start.format('MM')
		: end.format('MM');

	return Number(dominantMonth);
};

export const getFinancialYearRange = (year: number, month: number) => {
	const startDate = dayjs().year(year).month(month).startOf('month');
	const endDate = startDate.add(1, 'year').subtract(1, 'day').endOf('month');
	const formattedStartDate = startDate.format('MMMM YYYY');
	const formattedEndDate = endDate.format('MMMM YYYY');

	return `${formattedStartDate} - ${formattedEndDate}`;
};

const capitalizeFirstLetter = (text: string) => {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatWorkWeek = (workWeek: string[]) => {
	return workWeek.map((day) => capitalizeFirstLetter(day)).join(', ');
};

export const formatWorkWeekForEdit = (workWeek: string[]) => {
	return workWeek.map((day) => capitalizeFirstLetter(day)).join(',');
};

export const generatePayPeriodsForFinancialYear = (
	payPeriodData: any,
	isEdit: boolean
): any[] => {
	const {
		year,
		payrollStartDate,
		payrollEndDate,
		FinancialYearRange,
		financialMonth,
		workWeek,
	} = payPeriodData;

	const _startMonth = new Date(payrollStartDate).getMonth() + 1;

	const loopIteration = isEdit ? 12 - _startMonth + financialMonth + 1 : 12;

	const allPayPeriodData: any[] = [];

	let currentMonth = isEdit ? _startMonth - 1 : financialMonth;
	let currentYear = year;

	//need to change according to edit
	for (let count = 0; count < loopIteration; count++) {
		let startDate = dayjs(
			`${currentYear}-${currentMonth + 1}-${dayjs(
				payrollStartDate
			).date()}`
		);
		let endDate = startDate.add(1, 'month').subtract(1, 'day');

		if (endDate.date() !== dayjs(payrollEndDate).date()) {
			endDate = endDate.date(
				Math.min(endDate.daysInMonth(), dayjs(payrollEndDate).date())
			);
		}

		allPayPeriodData.push({
			year: year,
			payrollStartDate: startDate.format('YYYY-MM-DD'),
			payrollEndDate: endDate.format('YYYY-MM-DD'),
			financialYearRange: FinancialYearRange,
			financialMonth: financialMonth,
			workWeek: formatWorkWeek(workWeek),
			payPeriodName: payPeriodNameFn(
				startDate.format('DD-MM-YYYY'),
				endDate.format('DD-MM-YYYY')
			),
			sortId: count,
		});

		currentMonth++;
		if (currentMonth > 11) {
			currentMonth = 0;
			currentYear++;
		}
	}
	return allPayPeriodData;
};

export const hasTrueValue = (obj: any) => {
	return Object.values(obj).includes(true);
};

export function isSameArray(array1: any, array2: any) {
	const differencesInArray1 = array1.filter(
		(value: any) => !array2.includes(value)
	);

	const differencesInArray2 = array2.filter(
		(value: any) => !array1.includes(value)
	);

	if (differencesInArray1.length > 0 || differencesInArray2.length > 0) {
		return false;
	}
	return true;
}

export function decrypt(encryptedData: any) {
	let [iv, encryptedText] = encryptedData?.split(':');
	iv = CryptoJS.enc.Hex.parse(iv);
	let decrypted = CryptoJS.AES.decrypt(
		CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptedText)),
		CryptoJS.enc.Utf8.parse(encryptionKey),
		{ iv: iv, mode: CryptoJS.mode.CBC }
	);
	return decrypted?.toString(CryptoJS.enc.Utf8);
}

export function decryptForStanbic(encryptedData: any) {
	let [iv, encryptedText] = encryptedData?.split(':');
	iv = CryptoJS.enc.Hex.parse(iv);
	let decrypted = CryptoJS.AES.decrypt(
		CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptedText)),
		CryptoJS.enc.Utf8.parse(stanbicEncryptionKey),
		{ iv: iv, mode: CryptoJS.mode.CBC }
	);
	console.log('stanbicEncryptionKey: ', stanbicEncryptionKey);
	return decrypted?.toString(CryptoJS.enc.Utf8);
}

export const handleDownload = async (
	recordId: string,
	apiFunction: (id: string) => Promise<any>,
	setDownloadingRowId: (id: string | null) => void,
	recordName: string
) => {
	try {
		setDownloadingRowId(recordId);
		const response = await apiFunction(recordId);

		const contentDisposition = response.headers['content-disposition'];
		let filename = recordName || 'file';

		if (contentDisposition) {
			const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			const matches = filenameRegex.exec(contentDisposition);
			if (matches != null && matches[1]) {
				filename = matches[1].replace(/['"]/g, '');
			}
		}

		const blob = new Blob([response.data], {
			type: response.headers['content-type'],
		});

		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute('download', filename);

		document.body.appendChild(link);
		link.click();

		link.remove();
		window.URL.revokeObjectURL(link.href);
	} catch (error) {
		console.error('Error downloading record:', error);
	} finally {
		setDownloadingRowId(null);
	}
};

export const handleDownloadXlsx = async (
	recordId: string,
	apiFunction: (id: string) => Promise<any>,
	setDownloadingRowId: (id: string | null) => void,
	recordName: string
) => {
	try {
		setDownloadingRowId(recordId);
		const response = await apiFunction(recordId);

		const contentDisposition = response.headers['content-disposition'];
		let filename = recordName || 'file.xlsx'; // Default to .xlsx

		if (contentDisposition) {
			const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			const matches = filenameRegex.exec(contentDisposition);
			if (matches != null && matches[1]) {
				filename = matches[1].replace(/['"]/g, '');
			}
		}

		// Ensure the filename ends with .xlsx
		if (!filename.endsWith('.xlsx')) {
			filename = filename.replace(/\.[^/.]+$/, '') + '.xlsx';
		}

		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});

		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute('download', filename);

		document.body.appendChild(link);
		link.click();

		link.remove();
		window.URL.revokeObjectURL(link.href);
	} catch (error) {
		console.error('Error downloading record:', error);
	} finally {
		setDownloadingRowId(null);
	}
};

export const formatEntityName = (entityName: string): string => {
	if (!entityName) return '';
	return entityName
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const notificationModuleMapping = {
	EMPLOYEE: 'Employee',
	TAXATION: 'Taxation',
	SALARY: 'Salary',
	BRANCH_CODE: 'Branch Code',
	CATEGORY_CODE: 'Category Code',
	JOB_TITLE: 'Job Title',
	PAY_POINT: 'Pay-Point',
	DEPARTMENT: 'Department',
	COST_CENTER: 'Cost-Center',
	JOB_GRADE: 'Job Grade',
	LEAVE_MANAGEMENT: 'Leave Management',
	HOLIDAYS: 'Holidays',
	PAY_PERIOD: 'Pay-Period',
	PAY_GROUP: 'Pay-Group',
	STATUTORY_COMPONENTS: 'Statutory Components',
	EARNINGS: 'Earnings',
	DEDUCTIONS: 'Deductions',
	MID_MONTH_PAY: 'Mid-Month Pay',
	TIME_SHIFT: 'Time Shift',
	TIME_LOGS: 'Time Logs',
	TIME_SHEETS: 'Time Sheets',
	LEAVE_REQUEST: 'Leave Request',
};

export const calculateAge = (dob: string) => {
	const _dob = new Date(dob);
	const today = new Date();
	const diff = today.getTime() - _dob.getTime();
	const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
	return age;
};

export const parseCSV = (csvText: string) => {
	console.log('csvText: ', csvText);

	// Split into lines
	const lines = csvText.split(/\r\n|\n/).filter((line) => line.trim() !== '');

	// Extract headers
	const headers = lines[0]
		.split(',')
		.map((header) =>
			header.trim().replace(/\*/g, '').replace(/^"|"$/g, '')
		);

	// Parse data rows
	const data = lines.slice(1).map((line) => {
		const values: string[] = [];
		let currentValue = '';
		let isInsideQuotes = false;

		for (let char of line) {
			if (char === '"') {
				isInsideQuotes = !isInsideQuotes;
			} else if (char === ',' && !isInsideQuotes) {
				values.push(currentValue.trim().replace(/^"|"$/g, ''));
				currentValue = '';
			} else {
				currentValue += char;
			}
		}

		// Add the last value
		values.push(currentValue.trim().replace(/^"|"$/g, ''));

		// Map headers to values
		return headers.reduce((obj: any, header: string, index: number) => {
			obj[header] = values[index] || ''; // Default to empty string if value is missing
			return obj;
		}, {});
	});

	return data;
};

// export function parseCSV(csvText: any, options = {}) {
// 	// Default options
// 	const defaultOptions = {
// 		delimiter: ',',
// 		hasHeader: true,
// 		trimWhitespace: true,
// 	};

// 	// Merge provided options with defaults
// 	const config = { ...defaultOptions, ...options };

// 	// Split the text into lines
// 	const lines = csvText.trim().split(/\r?\n/);

// 	// Extract headers if hasHeader is true
// 	let headers = [];
// 	if (config.hasHeader) {
// 		headers = lines[0].split(config.delimiter);
// 		if (config.trimWhitespace) {
// 			headers = headers.map((header: any) => header.trim());
// 		}
// 		lines.shift(); // Remove header line
// 	}

// 	// Parse data rows
// 	const result = lines.map((line: any) => {
// 		console.log('line: ', line);
// 		// Split the line into values
// 		const values = line.split(config.delimiter);
// 		console.log('values: ', values);

// 		// Trim whitespace if configured
// 		const processedValues = config.trimWhitespace
// 			? values.map((value: any) => value.trim())
// 			: values;

// 		// Create object
// 		if (config.hasHeader) {
// 			// Map values to headers
// 			return headers.reduce((obj: any, header: any, index: number) => {
// 				obj[header] = processedValues[index] || '';
// 				return obj;
// 			}, {});
// 		} else {
// 			// Return array of values if no headers
// 			return processedValues;
// 		}
// 	});

// 	return result;
// }

export function capitalizeWords(str: string): string {
	if (str === 'NAPSA' || str === 'NHIMA' || str === 'PAYE') {
		return str;
	}
	return str
		.split(' ')
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(' ');
}

export const convertArrayToCSV = (data: any) => {
	if (!data || !data.length) {
		return '';
	}

	return Papa.unparse(data, {
		// Configuration options
		quotes: true, // Quote all fields
		header: true, // Include header row
		skipEmptyLines: true,
		// You can add more Papa.unparse options here
	});
};
export const lightTheme = {
	primaryColor: '#584495', // Main brand color
	secondaryColor: '#ffffff', // Background
	textColor: '#000000', // Primary text color
	textSecondary: '#6e6e6e', // Secondary text color
	borderColor: '#e8e8e8', // Border color
	hoverColor: '#f4f4f4', // Hover background
	sidebarBg: '#f4f4f4', // Sidebar background
	headerBg: '#ffffff', // Header background
	cardBg: '#ffffff', // Card background
	linkColor: '#584495', // Links
	linkHover: '#7a65c8', // Hover state for links
};

export const darkTheme = {
	primaryColor: '#7a65c8', // Slightly lighter for better contrast
	secondaryColor: '#141414', // Dark background
	textColor: '#ffffff', // Primary text color
	textSecondary: '#a6a6a6', // Secondary text color
	borderColor: '#303030', // Border color
	hoverColor: '#2d2d2d', // Hover background
	sidebarBg: '#1f1f1f', // Sidebar background
	headerBg: '#141414', // Header background
	cardBg: '#1f1f1f', // Card background
	linkColor: '#7a65c8', // Links
	linkHover: '#9b85e3', // Hover state for links
};
