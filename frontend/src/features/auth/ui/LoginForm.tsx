import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { useAuth } from '../model/useAuth';

export function LoginForm() {
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login(username, password);
			// 성공시 라우팅 처리 필요하면 여기서!
		} catch (err) {
			setError('아이디 또는 비밀번호가 올바르지 않습니다.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
			<Input
				label='아이디'
				placeholder='아이디'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				minLength={6}
				maxLength={16}
				required
				autoComplete='username'
			/>
			<Input
				label='비밀번호'
				placeholder='비밀번호'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				minLength={6}
				maxLength={20}
				required
				autoComplete='current-password'
			/>
			{error && (
				<div className='text-[var(--danger-text-default)] font-display-medium-16 px-2'>
					{error}
				</div>
			)}
			<Button
				variant='contained'
				type='submit'
				size='lg'
				disabled={loading || !username || !password}
				className='w-full'
			>
				<span className='font-available-medium-20'>
					{loading ? '로그인 중...' : '아이디로 로그인'}
				</span>
			</Button>
		</form>
	);
}

export default LoginForm;
