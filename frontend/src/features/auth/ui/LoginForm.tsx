import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
	const { mutate, isPending, isError, error } = useLogin();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate({ email, password });
	};

	return (
		<form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
			<Input
				label='이메일'
				placeholder='이메일'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				autoComplete='email'
			/>
			<Input
				label='비밀번호'
				placeholder='비밀번호'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type='password'
				required
				autoComplete='current-password'
			/>
			{isError && error instanceof Error && (
				<div className='text-[var(--danger-text-default)] font-display-medium-16 px-2'>
					{error.message}
				</div>
			)}
			<Button
				variant='contained'
				type='submit'
				size='lg'
				disabled={isPending || !email || !password}
				className='w-full'
			>
				<span className='font-available-medium-20'>
					{isPending ? '로그인 중...' : '이메일로 로그인'}
				</span>
			</Button>
		</form>
	);
}

export default LoginForm;
