import axios from 'axios';

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const apiConfig = (flag = false) => {
	if (localStorage.getItem('accessToken')) {
		return {
			headers: {
				Authorization: `bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': flag
					? 'multipart/form-data'
					: 'application/json',
			},
			method: 'PUT,DELETE,POST,GET,OPTION',
		};
	}
	return { withCredentials: false };
};

let navigateRef: any = null;

export const setNavigate = (navigateInstance: any) => {
	navigateRef = navigateInstance;
};

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response &&
			error.response.status === 401 &&
			error.response.data.error.name === 'TokenExpiredError' &&
			localStorage.getItem('accessToken')
		) {
			// localStorage.removeItem('accessToken');
			if (navigateRef) {
				navigateRef('/login');
			}
		} else if (
			error.response &&
			error.response.status === 401 &&
			localStorage.getItem('accessToken')
		) {
			// localStorage.removeItem('accessToken');
			if (navigateRef) {
				navigateRef('/login');
			}
		}
		return Promise.reject(error);
	}
);

export const getApi = (url?: string, params?: any) => {
	return axios.get(`${endPoint}${url}`, {
		params: params,
		...apiConfig(),
	});
};

export const postApi = (url: string, apiData?: any, flag?: boolean) => {
	return axios.post(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {
	return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const deleteApi = (url: string) => {
	return axios.delete(`${endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url: string, apiData?: any) => {
	return axios.delete(`${endPoint}${url}`, {
		data: apiData,
		...apiConfig(),
	});
};

export const putApiNoHeader = (url: string, apiData: any) => {
	if (localStorage.getItem('accessToken')) {
		return axios.put(`${endPoint}${url}`, apiData, {
			headers: {
				Authorization: `bearer ${localStorage.getItem('accessToken')}`,
			},
		});
	} else {
		// If there's no access token, return an error response or handle it as needed.
		return Promise.reject('No access token available');
	}
};

export const getApiExcel = async (url?: string, params?: any) => {
	const configData = await apiConfig();
	return axios.get(`${endPoint}${url}`, {
		params: params,
		responseType: 'arraybuffer',
		...configData,
	});
};

export const getApiPDF = async (url?: string, params?: any) => {
	const configData: any = apiConfig();
	configData.headers['responseType'] = 'blob';
	return axios.get(`${endPoint}${url}`, {
		params: params,
		responseType: 'blob',
		...configData,
	});
};

export const getApiCSV = async (url?: string, params?: any) => {
	const configData = await apiConfig();
	return axios.get(`${endPoint}${url}`, {
		params: params,
		responseType: 'arraybuffer',
		...configData,
	});
};
