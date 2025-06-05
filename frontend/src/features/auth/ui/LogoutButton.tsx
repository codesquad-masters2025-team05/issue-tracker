import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login', { replace: true });
	};

	return (
		<button
			type='button'
			aria-label='프로필'
			className='p-2 rounded-full cursor-pointer hover:bg-[var(--neutral-surface-bold)]'
			onClick={handleLogout}
		>
			<LogOut className='w-6 h-6' />
		</button>
	);
}

export default LogoutButton;
