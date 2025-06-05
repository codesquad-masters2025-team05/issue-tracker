export interface IssueCreateFormState {
	title: string;
	setTitle: (v: string) => void;
	content: string;
	setContent: (v: string) => void;
	assigneeIds: number[];
	setAssigneeIds: (ids: number[]) => void;
	labelIds: number[];
	setLabelIds: (ids: number[]) => void;
	milestoneId: number | null;
	setMilestoneId: (id: number | null) => void;
	files: FileList | null;
	setFiles: (files: FileList | null) => void;
}
