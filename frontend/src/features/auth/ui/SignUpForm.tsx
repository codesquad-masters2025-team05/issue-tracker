import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import type { RegisterRequest } from '../model/auth.types';

interface SignUpFormProps {
	onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState(
		'https://picsum.photos/id/237/200/300',
	);
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [error, setError] = useState<string | null>(null);

	const { mutate, isPending } = useRegister(() => {
		onSuccess?.();
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (password !== passwordCheck) {
			setError('비밀번호가 일치하지 않습니다.');
			return;
		}
		if (username.length < 6 || username.length > 16) {
			setError('아이디는 6~16자여야 합니다.');
			return;
		}
		if (password.length < 6 || password.length > 12) {
			setError('비밀번호는 6~12자여야 합니다.');
			return;
		}
		if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
			setError('유효한 이메일을 입력하세요.');
			return;
		}
		mutate({ username, email, imageUrl, password } as RegisterRequest);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-6 p-6 rounded-[var(--radius-large)] bg-[var(--color-grayscale-50)] shadow-md w-full max-w-md mx-auto'
		>
			<h2 className='font-display-bold-20 mb-2 text-center'>회원가입</h2>
			<Input
				type='basic'
				fixedValue='이름'
				placeholder='6~16자, 영문/숫자'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				minLength={6}
				maxLength={16}
				autoComplete='username'
			/>
			<Input
				type='basic'
				label='이메일'
				fixedValue='이메일'
				placeholder='example@email.com'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				// type='email'
				autoComplete='email'
			/>
			{/* <Input
				type='basic'
				label='이미지 URL'
				placeholder='프로필 이미지 URL (선택)'
				value={imageUrl}
				onChange={(e) => setImageUrl(e.target.value)}
				autoComplete='off'
			/> */}
			<Input
				type='basic'
				label='비밀번호'
				fixedValue='비밀번호'
				placeholder='6~12자, 영문/숫자'
				// type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				minLength={6}
				maxLength={12}
				autoComplete='new-password'
			/>
			<Input
				type='basic'
				label='비밀번호 확인'
				fixedValue='비밀번호'
				placeholder='비밀번호 재입력'
				// type='password'
				value={passwordCheck}
				onChange={(e) => setPasswordCheck(e.target.value)}
				required
				minLength={6}
				maxLength={12}
				autoComplete='new-password'
			/>
			{error && (
				<div className='text-[var(--color-accent-red)] font-display-medium-12'>
					{error}
				</div>
			)}
			<Button size='lg' type='submit' className='w-full' disabled={isPending}>
				회원가입 완료
			</Button>
		</form>
	);
}
