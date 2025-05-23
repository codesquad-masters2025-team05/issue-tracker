import Logo from '@/assets/logo_medium.svg?react';
import { ThemeToggleButton } from '@/shared/theme/ThemeToggleButton';
import { User } from 'lucide-react';
import type { FC } from 'react';

const Header: FC = () => {
	return (
		<div className='flex flex-wrap items-center justify-between h-[94px] gap-4'>
			<div className='w-50 flex items-center text-[var(--neutral-text-strong)]'>
				<Logo className='w-[199px] h-10' />
			</div>

			<div className='flex items-center gap-4'>
				<button
					type='button'
					aria-label='프로필'
					className='p-2 rounded-full cursor-pointer hover:bg-[var(--neutral-surface-bold)]'
				>
					<User className='w-6 h-6' />
				</button>

				<ThemeToggleButton />
			</div>
		</div>
	);
};

export default Header;
