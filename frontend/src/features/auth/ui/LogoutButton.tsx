import { Button } from '@/shared/ui/button';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login', { replace: true });
	};

	return (
		<div className='relative'>
			<button
				type='button'
				aria-label='로그아웃'
				className='p-2 rounded-full cursor-pointer hover:bg-[var(--neutral-surface-bold)]'
				onClick={() => setOpen(!open)}
			>
				<LogOut className='w-6 h-6' />
			</button>
			{open && (
				<div className='absolute top-12 right-0  z-10 w-56 bg-white border border-[var(--neutral-border-default)] rounded-xl shadow-md p-4 flex flex-col items-center gap-3'>
					<span className='font-display-medium-16'>로그아웃 하시겠습니까?</span>
					<div className='flex gap-2 w-full'>
						<Button
							variant='ghost'
							size='sm'
							className='flex-1 py-1 rounded-md border font-display-medium-16'
							onClick={() => setOpen(false)}
						>
							취소
						</Button>
						<Button
							variant='contained'
							size='sm'
							className='flex-1 py-1 rounded-md bg-[var(--danger-surface-default)] text-[var(--brand-text-default)] font-display-medium-16'
							onClick={handleLogout}
						>
							확인
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default LogoutButton;
