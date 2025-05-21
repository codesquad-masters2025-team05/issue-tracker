import { useState } from 'react';
import type { IssueCreateFormState } from './types';

export function useIssueCreateFormState(): IssueCreateFormState {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
	const [labelIds, setLabelIds] = useState<number[]>([]);
	const [milestoneId, setMilestoneId] = useState<number | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);

	return {
		title,
		setTitle,
		body,
		setBody,
		assigneeIds,
		setAssigneeIds,
		labelIds,
		setLabelIds,
		milestoneId,
		setMilestoneId,
		files,
		setFiles,
	};
}
