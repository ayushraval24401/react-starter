import { useState, useEffect } from 'react';

type FetchState<T> = {
	data: T | null;
	error: Error | null;
	loading: boolean;
};

export const useFetch = <T,>(url: string, options?: RequestInit) => {
	const [state, setState] = useState<FetchState<T>>({
		data: null,
		error: null,
		loading: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ data: null, error: null, loading: true });
			try {
				const response = await fetch(url, options);
				const result = await response.json();
				setState({ data: result, error: null, loading: false });
			} catch (err) {
				setState({ data: null, error: err as Error, loading: false });
			}
		};

		if (url) fetchData();
	}, [url, options]);

	return state;
};
