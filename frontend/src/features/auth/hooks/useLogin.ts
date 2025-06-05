import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import type { LoginRequest, LoginResponse } from '../model/auth.types';

export function useLogin(onSuccess?: (data: LoginResponse['data']) => void) {
	const navigate = useNavigate();
	const { mutate, isPending, isSuccess, isError, data, error, reset } =
		useMutation({
			mutationFn: (payload: LoginRequest) => login(payload),
			onSuccess: (data) => {
				if (data?.accessToken) {
					localStorage.setItem('token', data.accessToken);
					navigate('/');
				}
				onSuccess?.(data);
			},
		});

	return {
		mutate,
		isPending,
		isSuccess,
		isError,
		data,
		error,
		reset,
	};
}
