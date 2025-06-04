import Logo from '@/assets/logo_large.svg?react';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import OAuthLoginButton from '@/features/oauthLogin/ui/OAuthLoginButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
	const navigate = useNavigate();

	useEffect(() => {
		// 이미 토큰이 있으면 issues 페이지로 리다이렉트
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/issues', { replace: true });
		}
	}, [navigate]);

	return (
		<div className='flex flex-col min-h-screen items-center justify-center bg-[var(--neutral-surface-default)]'>
			<Logo className='w-[342px] h-[72px] text-[var(--neutral-text-strong)] mb-16' />
			<div className='flex flex-col gap-4 items-center w-[320px] mb-32'>
				<OAuthLoginButton />
				<span className='font-display-medium-16 text-[var(--neutral-text-weak)] relative -top-[2px]'>
					or
				</span>
				<LoginForm />
			</div>
		</div>
	);
}
