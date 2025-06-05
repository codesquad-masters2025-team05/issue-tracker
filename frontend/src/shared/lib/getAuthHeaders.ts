export function getAuthHeaders(includeContentType = true): HeadersInit {
	const token = localStorage.getItem('token');
	const headers: HeadersInit = {};

	if (includeContentType) {
		headers['Content-Type'] = 'application/json';
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
}
