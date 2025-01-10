export const validateSSN = (value: string) => {
	const ssnRegex = /^\d{9}$/;
	return !ssnRegex.test(value);
};

export const validateAccountNumber = (value: string) => {
	const accountNumberRegex = /^\d{13}$/;
	return accountNumberRegex.test(value)
		? ''
		: 'Account number must be a 13-digit number';
};

export const validateNationalRegistrationNumber = (value: string) => {
	const nrnRegex = /^\d{6}\/\d{2}\/\d$/;
	return nrnRegex.test(value)
		? ''
		: 'National Registration number must be in the format 000000/00/0';
};

export const validatePassportNumber = (value: string) => {
	const passportRegex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
	return passportRegex.test(value) ? '' : 'Invalid passport number';
};

export const formatNationalRegistrationNumber = (value: string) => {
	const cleaned = value.replace(/[^\d]/g, '');
	if (cleaned.length >= 9) {
		return `${cleaned.slice(0, 6)}/${cleaned.slice(6, 8)}/${cleaned.slice(
			8,
			9
		)}`;
	}
	return value;
};

export const passportPatterns = {
	Nigeria: /^[A-Za-z][0-9]{8}$/,
	'South Africa': /^[0-9]{13}$/,
	Kenya: /^[A-Za-z][0-9]{7}$/,
	Ghana: /^[A-Za-z]{2}[0-9]{7}$/,
};
