export interface Label {
	id: number;
	name: string;
	description: string;
	textColor: string;
	backgroundColor: string;
}

export interface User {
	id: number;
	username: string;
	imageUrl: string;
}

export interface UserSummary {
	id: number;
	username: string;
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
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

export interface Comment {
	id: number;
	content: string;
	author: User;
	createdAt: string;
	updatedAt: string;
}

export interface IssueListItem {
	id: number;
	title: string;
	isOpen: boolean;
	labels: Label[];
	author: UserSummary;
	assignees: User[];
	milestone: MilestoneSummary | null;
	createdAt: string;
	updatedAt: string;
	commentsCount: number;
}

export interface IssueListData {
	total: number;
	page: number;
	perPage: number;
	q: string;
	issues: IssueListItem[];
}

export interface IssueDetailData {
	id: number;
	title: string;
	isOpen: boolean;
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
	content: string;
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
	assigneeIds?: number[];
	labelIds?: number[];
	milestoneId?: number | null;
	isOpen?: boolean;
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
