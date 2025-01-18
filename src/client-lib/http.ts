import { invalidText } from 'utils/utils';

function toFlat(obj: any, prefix: any) {
	let flat: any = {};
	if (Array.isArray(obj)) {
		if (obj.some((value) => typeof value === 'object')) {
			obj.forEach((value, index) => {
				if (value !== null && typeof value === 'object') {
					flat = { ...toFlat(value, `${prefix}[${index}]`), ...flat };
				} else {
					flat = { [`${prefix}[${index}]`]: value, ...flat };
				}
			});
		} else {
			flat[prefix] = obj;
		}
	} else {
		for (const key in obj) {
			if (Object.hasOwn(obj, key)) {
				const value = obj[key];
				if (value !== null && typeof value === 'object') {
					flat = { ...toFlat(value, `${prefix}[${key}]`), ...flat };
				} else {
					flat[`${prefix}[${key}]`] = value;
				}
			}
		}
	}
	return flat;
}

function serialize(obj: any) {
	let flatObj: any = {};
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const value = obj[key];
			if (value !== null && typeof value === 'object') {
				flatObj = { ...toFlat(value, key), ...flatObj };
			} else {
				flatObj[key] = value;
			}
		}
	}
	return flatObj;
}

async function call(
	method: string,
	url: string,
	{ queryParams, headers, body }: any
) {
	try {
		if (queryParams) {
			if (url.includes('?')) {
				// merge query params
			}
			url += '?' + new URLSearchParams(serialize(queryParams)).toString();
		}
		headers = headers || {};
		let token = localStorage.getItem('token');
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		if (!headers['Content-Type']) {
			headers['Content-Type'] = 'application/json';
			if (!invalidText(body)) {
				body = JSON.stringify(body);
			}
		} else if (
			'application/json' === `${headers['Content-Type']}`.toLowerCase() &&
			!invalidText(body)
		) {
			body = JSON.stringify(body);
		} else if (
			'multipart/form-data' === `${headers['Content-Type']}`.toLowerCase()
		) {
			delete headers['Content-Type'];
		}
		const response = await fetch(url, {
			method,
			headers,
			body,
		});
		let responseJson: any = await response.text();
		try {
			responseJson = JSON.parse(responseJson);
		} catch (e) {
			//
		}
		if (!response.ok || responseJson?.errors?.length) {
			if (response.status === 401) {
				localStorage.removeItem('token');
				window.location.replace(`${process.env.REACT_APP_LOGIN_URL}`);
			}
			throw responseJson;
		}
		return responseJson;
	} catch (error: any) {
		let errorMessage;
		if (error?.errors?.length) {
			errorMessage = error.errors.map((e: any) => e.message).join(', ');
		} else {
			errorMessage = error.message;
		}

		console.log(errorMessage);

		throw error;
	}
}

const http = {
	get: async (url: string, { queryParams, headers }: RequestEntity = {}) =>
		call('GET', url, { queryParams, headers }),

	post: async (
		url: string,
		{ queryParams, headers, body }: RequestEntity = {}
	) => call('POST', url, { queryParams, headers, body }),

	put: async (
		url: string,
		{ queryParams, headers, body }: RequestEntity = {}
	) => call('PUT', url, { queryParams, headers, body }),

	delete: async (url: string, { queryParams, headers }: RequestEntity = {}) =>
		call('DELETE', url, { queryParams, headers }),
};

export default http;

interface RequestEntity {
	queryParams?: any;
	headers?: any;
	body?: any;
}
