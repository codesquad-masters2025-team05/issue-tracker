import { useFetchMilestoneList } from '@/entities/milestone/hooks/useFetchMilestoneList';
import { useEffect, useState } from 'react';
import { MilestoneListItem } from './MilestoneListItem';

export const MilestoneList = () => {
	const { data, refetch } = useFetchMilestoneList();
	const milestones = data?.milestones ?? [];
	const total = data?.total ?? 0;

	// 한 번에 한 행만 편집!
	const [editingId, setEditingId] = useState<number | null>(null);

	useEffect(() => {
		refetch;
	}, [refetch]);

	return (
		<div className='border border-[var(--neutral-border-default)] rounded-2xl'>
			<div className='px-8 py-5 font-display-bold-16 text-[var(--neutral-text-default)]'>{`${total}개의 마일스톤`}</div>
			{milestones.map((milestone, idx) => (
				<div key={milestone.id}>
					<HorizontalDivision />
					<MilestoneListItem
						milestone={milestone}
						className={milestones.length - 1 === idx ? 'rounded-b-2xl' : ''}
						editing={editingId === milestone.id}
						onEdit={() => setEditingId(milestone.id)}
						onCloseEdit={() => setEditingId(null)}
					/>
				</div>
			))}
		</div>
	);
};

const HorizontalDivision = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);
