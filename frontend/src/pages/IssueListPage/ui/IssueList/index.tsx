import type { IssueListItem } from '@/entities/issue/model/issue.types';
import { useNavigate } from 'react-router-dom';
import type { IssueListFilterState } from '../../model/types';
import { IssueItem } from './IssueItem';
import { IssueListHeader } from './IssueListHeader';

interface IssueListProps extends IssueListFilterState {
	issues: IssueListItem[];
}

export function IssueList(props: IssueListProps) {
	const {
		issues,
		isOpen,
		setIsOpen,
		stateId,
		setStateId,
		assigneeId,
		setAssigneeId,
		labelIds,
		setLabelIds,
		milestoneId,
		setMilestoneId,
		authorId,
		setAuthorId,
	} = props;

	const navigate = useNavigate();

	const handleClickIssue = (id: number) => {
		navigate(`/issues/${id}`);
	};

	return (
		<div className='flex flex-col rounded-2xl border border-[var(--neutral-border-default)] divide-y divide-[var(--neutral-border-default)] text-[var(--neutral-border-default)] '>
			<IssueListHeader
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				stateId={stateId}
				setStateId={setStateId}
				assigneeId={assigneeId}
				setAssigneeId={setAssigneeId}
				labelIds={labelIds}
				setLabelIds={setLabelIds}
				milestoneId={milestoneId}
				setMilestoneId={setMilestoneId}
				authorId={authorId}
				setAuthorId={setAuthorId}
			/>
			{issues.map((issue, idx) => (
				<div
					key={issue.id}
					className={`bg-[var(--neutral-surface-strong)] hover:bg-[var(--neutral-surface-default)] ${idx === issues.length - 1 ? 'rounded-b-2xl' : ''}`}
				>
					<IssueItem
						issue={issue}
						onClickTitle={() => handleClickIssue(issue.id)}
					/>
				</div>
			))}
		</div>
	);
}
