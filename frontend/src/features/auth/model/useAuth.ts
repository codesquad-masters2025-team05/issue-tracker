import { useState } from 'react';
import { login } from '../api/authApi';

export function useAuth() {
	const [token, setToken] = useState(() => localStorage.getItem('token') ?? '');
	const [user, setUser] = useState(null);

	const loginHandler = async (username: string, password: string) => {
		const { token, user } = await login({ username, password });
		localStorage.setItem('token', token);
		setToken(token);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken('');
		setUser(null);
	};

	return { token, user, login: loginHandler, logout };
}
