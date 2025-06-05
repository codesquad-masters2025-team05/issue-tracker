import Logo from '@/assets/logo_medium.svg?react';
import LogoutButton from '@/features/auth/ui/LogoutButton';
import { ThemeToggleButton } from '@/shared/theme/ThemeToggleButton';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from './ui/ProfileButton';

const Header: FC = () => {
	return (
		<div className='flex flex-wrap items-center justify-between h-[94px] gap-4'>
			<div className='w-50 flex items-center text-[var(--neutral-text-strong)]'>
				<Link to='/issues' aria-label='이슈 목록으로 이동'>
					<Logo className='w-[199px] h-10 cursor-pointer transition hover:opacity-80' />
				</Link>
			</div>

			<div className='flex items-center gap-2'>
				<ProfileButton />
				<LogoutButton />
				<ThemeToggleButton />
			</div>
		</div>
	);
};

export default Header;
