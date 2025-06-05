import { User } from 'lucide-react';
import { useState } from 'react';

// JWT 디코딩 함수
function decodeJwt(token: string) {
	try {
		const payload = token.split('.')[1];
		const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
		return JSON.parse(decoded);
	} catch {
		return null;
	}
}

// 타임스탬프 → 날짜 문자열 변환
function formatDate(unix: number) {
	if (!unix) return '-';
	const date = new Date(unix * 1000);
	return date.toLocaleString();
}

export function ProfileButton() {
	const [open, setOpen] = useState(false);
	const [decoded, setDecoded] = useState(null);

	const handleClick = () => {
		const token = localStorage.getItem('token');
		if (token) {
			setDecoded(decodeJwt(token));
		} else {
			setDecoded(null);
		}
		setOpen(true);
	};

	return (
		<div className='relative'>
			<button
				type='button'
				aria-label='프로필'
				className='p-2 rounded-full cursor-pointer hover:bg-[var(--neutral-surface-bold)]'
				onClick={handleClick}
			>
				<User className='w-6 h-6' />
			</button>
			{open && (
				<div className='absolute top-12 left-1/2 -translate-x-2/3 z-10 w-80 bg-white border border-[var(--neutral-border-default)] rounded-xl shadow-md p-5 flex flex-col items-center'>
					<div className='font-display-bold-16 mb-4'>내 프로필 정보</div>
					{decoded ? (
						<div className='w-full flex flex-col gap-2'>
							<div className='flex justify-between font-display-medium-16'>
								<span className='text-gray-500'>email</span>
								<span>{decoded.sub}</span>
							</div>
							<div className='flex justify-between font-display-medium-16'>
								<span className='text-gray-500'>로그인시각</span>
								<span>{formatDate(decoded.iat)}</span>
							</div>
						</div>
					) : (
						<div className='text-sm text-gray-400'>토큰이 없습니다.</div>
					)}
					<button
						type='button'
						className='mt-6 w-full py-2 rounded-md border font-display-medium-16 hover:bg-[var(--neutral-surface-bold)]'
						onClick={() => setOpen(false)}
					>
						닫기
					</button>
				</div>
			)}
		</div>
	);
}

export default ProfileButton;
