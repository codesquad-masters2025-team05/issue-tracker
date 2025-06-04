import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';

export function SignUpButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/signup');
	};

	return (
		<Button
			type='button'
			size='lg'
			className='w-full'
			variant='ghost'
			onClick={handleClick}
		>
			회원가입
		</Button>
	);
}
