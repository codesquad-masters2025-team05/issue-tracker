export interface IssueUpdateRequest {
	title?: string;
	assigneeIds?: number[];
	labelIds?: number[];
	milestoneId?: number | null;
	isOpen?: boolean;
}
