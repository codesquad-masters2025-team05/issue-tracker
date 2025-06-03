import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../model/useAuth';

export function LogoutButton() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
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
