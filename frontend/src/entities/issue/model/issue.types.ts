export interface Label {
	id: number;
	name: string;
	color: string;
}

export interface Author {
	id: number;
	username: string;
	imageUrl: string;
}

export interface Milestone {
	id: number;
	title: string;
}

export interface Issue {
	id: number;
	number?: number;
	title: string;
	labels: Label[];
	author: Author;
	milestone: Milestone | null;
	createdAt: string;
	updatedAt: string | null;
	commentsCount: number;
	open: boolean;
}

export interface IssueListData {
	total: number;
	page: number;
	perPage: number;
	issues: Issue[];
}

export interface IssueCreateRequest {
	title: string;
	body: string;
	assigneeId: number;
	labelIds: number[];
	milestoneId: number | null;
}

export interface IssueCreateResponse {
	success: boolean;
	data: number;
	error: string | null;
}
