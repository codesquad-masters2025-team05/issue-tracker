import MilestoneIcon from '@/assets/milestone.svg?react';
import { useFetchMilestoneDetail } from '../hooks/useFetchMilestoneDetail';

interface Props {
	id: number;
}

export function MilestoneDetailCard({ id }: Props) {
	const { data } = useFetchMilestoneDetail(id);

	if (!data) return;

	const formattedDeadline = data.deadline
		? data.deadline.replace(/-/g, '. ')
		: '';

	return (
		<div className='flex flex-col gap-3 bg-[var(--neutral-surface-default)] rounded-[16px] px-6 py-5 shadow-[var(--shadow-light)] border border-[var(--neutral-border-default)] w-full max-w-[325px]'>
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

			{/* 열린/닫힌/진행률 가로로 정렬 */}
			<div className='flex items-end justify-between mt-2 mb-1'>
				<div className='flex flex-col items-center w-1/3'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.openIssueCount}
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						열린 이슈
					</span>
				</div>
				<div className='flex flex-col items-center w-1/3'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.closedIssueCount}
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						닫힌 이슈
					</span>
				</div>
				<div className='flex flex-col items-center w-1/3'>
					<span className='font-display-bold-16 text-[var(--palette-blue)]'>
						{data.progress}%
					</span>
					<span className='font-display-medium-12 text-[var(--neutral-text-weak)]'>
						진행률
					</span>
				</div>
			</div>

			{/* 프로그레스바: 전체 너비, 맨 아래 */}
			<div className='w-full h-2 bg-[var(--neutral-surface-bold)] rounded-[8px] mt-1 mb-1 relative overflow-hidden'>
				<div
					className='h-2 rounded-[8px] bg-[var(--palette-blue)] absolute top-0 left-0'
					style={{ width: `${data.progress}%` }}
				/>
			</div>
		</div>
	);
}
