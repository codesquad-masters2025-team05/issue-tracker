import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { register } from '../api/authApi';
import type { RegisterRequest, RegisterResponse } from '../model/auth.types';

export function useRegister(
	onSuccess?: (data: RegisterResponse['data']) => void,
) {
	const { mutate, isPending, isSuccess, isError, data, error, reset } =
		useMutation({
			mutationFn: (payload: RegisterRequest) => register(payload),
			onSuccess,
			onError: (error) => {
				toast.error(
					error instanceof Error ? error.message : '회원가입에 실패했습니다.',
				);
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
