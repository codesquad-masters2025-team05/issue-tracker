import LabelIcon from '@/assets/label.svg?react';
import MilestonIcon from '@/assets/milestone.svg?react';
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';

export function LabelListButton({
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

export function MilestoneListButton({
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
