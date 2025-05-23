import { useThemeStore } from '@/shared/theme/useThemeStore';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggleButton() {
	const { theme, cycleTheme } = useThemeStore();

	return (
		<button
			type='button'
			tabIndex={0}
			aria-label='Toggle theme'
			onClick={cycleTheme}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') cycleTheme();
			}}
			className='p-2 inline-flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-[var(--neutral-surface-bold)]'
		>
			{theme === 'dark' ? (
				<Moon className='w-5 h-5' />
			) : (
				<Sun className='w-5 h-5' />
			)}
		</button>
	);
}
