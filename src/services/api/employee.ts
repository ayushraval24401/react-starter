import { getApi, postApi } from 'apis';

const getEmployee = (params?: any) => {
	return getApi('/employee', params);
};

const addEmployee = (data: any) => {
	return postApi('/employee', data);
};

export const employeeService = {
	getEmployee,
	addEmployee,
};
