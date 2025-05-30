import MilestoneIcon from '@/assets/milestone.svg?react';
import { useFetchMilestoneDetail } from '../hooks/useFetchMilestoneDetail';

interface Props {
	id: number;
}

export function MilestoneDetailCard({ id }: Props) {
	const { data, isLoading, isError } = useFetchMilestoneDetail(id);

	if (isLoading) return <div>로딩 중...</div>;
	if (isError || !data) return <div>정보를 불러올 수 없습니다.</div>;

	// 날짜 변환: "2025-05-30" -> "2025. 05. 30"
	const formattedDeadline = data.deadline
		? data.deadline.replace(/-/g, '. ')
		: null;

	return (
		<div className='flex flex-col gap-3 bg-[var(--neutral-surface-default)] rounded-[16px] px-6 py-5 shadow-[var(--shadow-light)] border border-[var(--neutral-border-default)] w-full max-w-[420px]'>
			<div className='flex items-center gap-3'>
				<MilestoneIcon className='size-7 text-[var(--palette-blue)]' />
				<span className='font-display-bold-20 text-[var(--neutral-text-strong)]'>
					{data.name}
				</span>
				{!data.isOpen && (
					<span className='ml-2 text-[var(--neutral-text-weak)] font-display-bold-12 px-2 py-0.5 border rounded-[8px] border-[var(--neutral-border-default)]'>
						종료
					</span>
				)}
			</div>
			{data.deadline && (
				<div className='text-[var(--neutral-text-default)] font-display-medium-16'>
					<span className='mr-1'>마감일</span>
					<span>{formattedDeadline}</span>
				</div>
			)}
			{data.description && (
				<div className='text-[var(--neutral-text-weak)] font-display-medium-16'>
					{data.description}
				</div>
			)}
			<div className='flex items-center gap-5 mt-2'>
				<div className='flex flex-col items-center'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.openIssueCount}
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						열린 이슈
					</span>
				</div>
				<div className='flex flex-col items-center'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.closedIssueCount}
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						닫힌 이슈
					</span>
				</div>
				<div className='flex-1 flex flex-col items-end'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.progress}%
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						진행률
					</span>
					<div className='w-[90px] h-2 bg-[var(--neutral-surface-bold)] rounded-[8px] mt-1'>
						<div
							className='h-2 rounded-[8px] bg-[var(--palette-blue)]'
							style={{ width: `${data.progress}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
