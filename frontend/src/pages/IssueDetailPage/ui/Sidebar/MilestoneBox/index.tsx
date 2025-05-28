import MilestoneIcon from '@/assets/milestone.svg?react';

interface MilestoneBoxProps {
	milestone: {
		id: number;
		name: string;
		description?: string;
		deadline?: string;
		isOpen: boolean;
		openIssueCount: number;
		closedIssueCount: number;
		progress: number; // 0~100
	};
}

export function MilestoneBox({ milestone }: MilestoneBoxProps) {
	const {
		name,
		description,
		deadline,
		isOpen,
		openIssueCount,
		closedIssueCount,
		progress,
	} = milestone;

	// 날짜 포맷 YYYY-MM-DD → YYYY.MM.DD
	const formatDate = (dateStr?: string) => {
		if (!dateStr) return '';
		return dateStr.replace(/-/g, '.');
	};

	return (
		<div className='flex flex-col gap-4 bg-[var(--color-grayscale-50)] border border-[var(--color-grayscale-300)] rounded-[16px] shadow-[var(--shadow-light)] p-6 w-full max-w-[380px]'>
			<div className='flex items-center gap-2'>
				<MilestoneIcon className='w-6 h-6 text-[var(--color-accent-blue)]' />
				<span className='font-display-bold-20'>{name}</span>
				<span
					className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium
          ${isOpen ? 'bg-[var(--color-accent-blue)] text-white' : 'bg-[var(--color-grayscale-200)] text-[var(--color-grayscale-600)]'}`}
				>
					{isOpen ? 'Open' : 'Closed'}
				</span>
			</div>
			{description && (
				<div className='font-display-medium-16 text-[var(--color-grayscale-600)]'>
					{description}
				</div>
			)}
			<div className='flex items-center justify-between'>
				{deadline && (
					<div className='flex items-center gap-1 text-[var(--color-grayscale-600)] font-display-medium-12'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							strokeWidth={2}
							viewBox='0 0 24 24'
						>
							<path d='M8 7V3m8 4V3m-9 8h10m-9 8h10M4 6h16v14H4z' />
						</svg>
						<span>{formatDate(deadline)}</span>
					</div>
				)}
				<span className='ml-auto text-[var(--color-grayscale-500)] font-display-medium-12'>
					{openIssueCount} open / {closedIssueCount} closed
				</span>
			</div>
			{/* Progress Bar */}
			<div className='w-full h-2 rounded-full bg-[var(--color-grayscale-200)] mt-1'>
				<div
					className='h-2 rounded-full bg-[var(--color-accent-blue)] transition-all'
					style={{ width: `${progress}%` }}
				/>
			</div>
			{/* Progress 퍼센트 */}
			<div className='text-right text-xs text-[var(--color-grayscale-600)] font-display-medium-12'>
				{progress}%
			</div>
		</div>
	);
}
