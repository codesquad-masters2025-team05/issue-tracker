// src/shared/auth/AuthGuard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthGuard({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/login', { replace: true });
		}
	}, [token, navigate]);

	// token이 있으면 children(원래 페이지) 보여줌
	return token ? <>{children}</> : null;
}

export default AuthGuard;
