import { useState } from 'react';
import type { IssueListFilterState } from './types';

export function useIssueListFilterState(): IssueListFilterState {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [stateId, setStateId] = useState<number | null>(null);
	const [assigneeId, setAssigneeId] = useState<number | null>(null);
	const [labelIds, setLabelIds] = useState<number[]>([]);
	const [milestoneId, setMilestoneId] = useState<number | null>(null);
	const [authorId, setAuthorId] = useState<number | null>(null);

	return {
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
	};
}
