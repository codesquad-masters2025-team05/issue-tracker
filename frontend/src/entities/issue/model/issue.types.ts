export interface Label {
	id: number;
	name: string;
	textColor: string;
	backgroundColor: string;
}

export interface User {
	id: number;
	username: string;
	imageUrl: string;
}

export interface MilestoneSummary {
	id: number;
	name: string;
}

export interface MilestoneDetail {
	id: number;
	name: string;
	description: string;
	deadline: string;
	open: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

export interface Attachment {
	id: number;
	fileName: string;
	url: string;
}

export interface Comment {
	id: number;
	body: string;
	author: User;
	createdAt: string;
	updatedAt: string;
	attachments: Attachment[];
}

export interface IssueListItem {
	id: number;
	number?: number;
	title: string;
	labels: Label[];
	author: User;
	milestone: MilestoneSummary | null;
	createdAt: string;
	updatedAt: string | null;
	commentsCount: number;
	open: boolean;
}

export interface IssueListData {
	total: number;
	page: number;
	perPage: number;
	issues: IssueListItem[];
}

export interface IssueDetailResponse {
	id: number;
	title: string;
	open: boolean;
	labels: Label[];
	author: User;
	assignees: User[];
	milestone: MilestoneDetail | null;
	createdAt: string;
	updatedAt: string;
	comments: Comment[];
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
	milestoneId?: number | null;
	open?: boolean;
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
