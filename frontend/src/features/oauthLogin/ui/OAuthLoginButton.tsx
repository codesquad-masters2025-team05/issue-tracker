import { Button } from '@/shared/ui/button';
import { GITHUB_OAUTH_URL } from '../api/oauthApi';

export function OAuthLoginButton() {
	const handleClick = () => {
		window.location.href = GITHUB_OAUTH_URL;
	};
	return (
		<Button
			variant='outline'
			type='button'
			size='lg'
			onClick={handleClick}
			className='w-full'
		>
			<span className='font-available-medium-20'>GitHub 계정으로 로그인</span>
		</Button>
	);
}

export default OAuthLoginButton;
