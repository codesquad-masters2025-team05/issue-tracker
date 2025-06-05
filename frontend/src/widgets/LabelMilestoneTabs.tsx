import LabelIcon from '@/assets/label.svg?react';
import MilestoneIcon from '@/assets/milestone.svg?react';
import { useFetchLabelCount } from '@/entities/label/hooks/useFetchLabelCount';
import { useFetchMilestoneCount } from '@/entities/milestone/hooks/useFetchMilestoneCount';
import { Button } from '@/shared/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

export function NavigationButton() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const {
		data: labelCount = 0,
		isLoading: isLabelLoading,
		isError: isLabelError,
	} = useFetchLabelCount();

	const {
		data: milestoneCount = 0,
		isLoading: isMilestoneLoading,
		isError: isMilestoneError,
	} = useFetchMilestoneCount();

	// 현재 경로에 따라 강조 스타일 적용
	const isLabelPage = pathname === '/labels';
	const isMilestonePage = pathname === '/milestones';

	return (
		<div className='flex w-80 border border-[var(--neutral-border-default)] rounded-2xl overflow-hidden'>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				pattern='icon-text'
				onClick={() => navigate('/labels')}
				className={[
					'flex-1 flex items-center gap-2 rounded-r-none',
					'font-available-medium-16',
					isLabelPage
						? 'bg-[var(--neutral-surface-bold)] text-[var(--neutral-text-strong)] font-bold'
						: 'bg-transparent text-[var(--neutral-text-default)] font-medium',
				].join(' ')}
				aria-current={isLabelPage ? 'page' : undefined}
			>
				<LabelIcon />
				<span>
					레이블(
					{isLabelLoading ? '-' : isLabelError ? '!' : labelCount})
				</span>
			</Button>
			<div className='border-r border-[var(--neutral-border-default)]' />
			<Button
				type='button'
				variant='ghost'
				size='sm'
				pattern='icon-text'
				onClick={() => navigate('/milestones')}
				className={[
					'flex-1 flex items-center gap-2 rounded-l-none',
					'font-available-medium-16',
					isMilestonePage
						? 'bg-[var(--neutral-surface-bold)] text-[var(--neutral-text-strong)] font-bold'
						: 'bg-transparent text-[var(--neutral-text-default)] font-medium',
				].join(' ')}
				aria-current={isMilestonePage ? 'page' : undefined}
			>
				<MilestoneIcon />
				<span>
					마일스톤(
					{isMilestoneLoading ? '-' : isMilestoneError ? '!' : milestoneCount})
				</span>
			</Button>
		</div>
	);
}
