import { useEffect, useState } from 'react';

export function useIssueInitialIds(data) {
	const [labelIds, setLabelIds] = useState<number[]>([]);
	const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
	const [milestoneId, setMilestoneId] = useState<number | null>(null);

	useEffect(() => {
		if (data) {
			setLabelIds(data.labels?.map((label) => label.id) ?? []);
			setAssigneeIds(data.assignees?.map((a) => a.id) ?? []);
			setMilestoneId(data.milestone?.id ?? null);
		}
	}, [data]);

	return {
		labelIds,
		setLabelIds,
		assigneeIds,
		setAssigneeIds,
		milestoneId,
		setMilestoneId,
	};
}
