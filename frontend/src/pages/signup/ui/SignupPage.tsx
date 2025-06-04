import Logo from '@/assets/logo_large.svg?react';
import { SignUpForm } from '@/features/auth/ui/SignUpForm';
import { Link, useNavigate } from 'react-router-dom';

export function SignUpPage() {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col min-h-screen items-center justify-center bg-[var(--color-grayscale-100)] pb-32'>
			<Link to='/issues' aria-label='이슈 목록으로 이동' className='mb-16'>
				<Logo className='w-[342px] h-[72px] text-[var(--neutral-text-strong)]' />
			</Link>
			<SignUpForm onSuccess={() => navigate('/login')} />
		</div>
	);
}
