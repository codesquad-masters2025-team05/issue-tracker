import { useOAuthLogin } from '@/features/oauthLogin';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function GitHubCallbackPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	const error = searchParams.get('error');

	const { authData, isLoading, isError, isSuccess } = useOAuthLogin(code || '');

	useEffect(() => {
		// URL에 error 파라미터가 있는 경우 (사용자가 GitHub 인증을 거부한 경우 등)
		if (error) {
			console.error('OAuth error:', error);
			navigate('/login', { replace: true });
			return;
		}

		// code가 없는 경우
		if (!code) {
			console.error('No authorization code received');
			navigate('/login', { replace: true });
			return;
		}
	}, [error, code, navigate]);

	useEffect(() => {
		// 인증 성공 시 토큰 저장 및 리다이렉트
		if (isSuccess && authData?.accessToken) {
			localStorage.setItem('accessToken', authData.accessToken);
			navigate('/', { replace: true });
		}
	}, [isSuccess, authData, navigate]);

	useEffect(() => {
		// 인증 실패 시 로그인 페이지로 리다이렉트
		if (isError) {
			console.error('Failed to exchange code for token');
			navigate('/login', { replace: true });
		}
	}, [isError, navigate]);

	// 로딩 중일 때 표시할 UI
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
					<p className='text-gray-600'>GitHub 로그인 처리 중...</p>
				</div>
			</div>
		);
	}

	// 에러 상태일 때도 로딩 UI를 보여주고 useEffect에서 리다이렉트 처리
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
				<p className='text-gray-600'>로그인 처리 중...</p>
			</div>
		</div>
	);
}
