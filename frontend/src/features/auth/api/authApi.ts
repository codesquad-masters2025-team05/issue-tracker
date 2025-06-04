import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from '../model/auth.types';

export async function register(
	request: RegisterRequest,
): Promise<RegisterResponse['data']> {
	const res = await fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request),
	});

	const result: RegisterResponse = await res.json();
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}

export async function login(
	request: LoginRequest,
): Promise<LoginResponse['data']> {
	const res = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request),
	});

	const result: LoginResponse = await res.json();
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}
