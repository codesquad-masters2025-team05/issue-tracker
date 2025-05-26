export interface Label {
	id: number;
	name: string;
	textColor: string;
	backgroundColor: string;
}

export interface Author {
	id: number;
	username: string;
	imageUrl: string;
}

export interface Milestone {
	id: number;
	name: string;
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
	assigneeIds: number[];
	labelIds: number[];
	milestoneId: number | null;
}

export interface IssueCreateResponse {
	success: boolean;
	data: number;
	error: string | null;
}

export interface IssueUpdateRequest {
	title?: string;
	body?: string;
	assigneeIds?: number[];
	labelIds?: number[];
	milestoneId?: number;
	state?: 'open' | 'closed';
}

export interface IssueUpdateResponse {
	success: boolean;
	data: null;
	error: string | null;
}

export interface IssueDeleteResponse {
	success: boolean;
	data: null;
	error: string | null;
}
