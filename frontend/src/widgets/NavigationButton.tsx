import LabelIcon from '@/assets/label.svg?react';
import MilestonIcon from '@/assets/milestone.svg?react';
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';

function LabelListButton({
	total,
	className = '',
}: { total: number; className?: string }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/labels');
	};

	return (
		<Button
			variant='ghost'
			size='sm'
			pattern='icon-text'
			onClick={handleClick}
			className={`text=[var(--neutral-text-default)] font-available-medium-16 rounded-r-none ${className}`}
		>
			<LabelIcon />
			<span>레이블{`(${total && 0})`}</span>
		</Button>
	);
}

function MilestoneListButton({
	total,
	className,
}: { total: number; className?: string }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/milestones');
	};

	return (
		<Button
			variant='ghost'
			size='sm'
			pattern='icon-text'
			onClick={handleClick}
			className={`text=[var(--neutral-text-default)] font-available-medium-16 rounded-l-none ${className}`}
		>
			<MilestonIcon />
			<span>마일스톤{`(${total && 0})`}</span>
		</Button>
	);
}

export function NavigationButton() {
	return (
		<div className='flex w-80 border border-[var(--neutral-border-default)] rounded-2xl'>
			<LabelListButton total={0} className='flex-1' />
			<div className='border-r border-[var(--neutral-border-default)]' />
			<MilestoneListButton total={0} className='flex-1' />
		</div>
	);
}
