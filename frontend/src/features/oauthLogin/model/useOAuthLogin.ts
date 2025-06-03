import { useState } from 'react';
import { exchangeGithubCode } from '../api/oauthApi';

export function useOAuthLogin() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 깃허브 콜백(code)로 로그인 처리
	const loginWithGithubCode = async (code: string) => {
		setLoading(true);
		setError(null);
		try {
			const { token, user } = await exchangeGithubCode(code);
			localStorage.setItem('token', token);
			// 추가로 user 상태관리 필요하면 여기에!
			return { token, user };
		} catch {
			setError('깃허브 로그인에 실패했습니다.');
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, loginWithGithubCode };
}
