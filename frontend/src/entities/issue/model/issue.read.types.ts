import type { ApiResponse } from './api.types';

export interface Label {
	id: number;
	name: string;
	description: string;
	textColor: string;
	backgroundColor: string;
}

export interface Author {
	id: number;
	username: string;
}

export interface Milestone {
	id: number;
	name: string;
}

export interface Assignee {
	id: number;
	username: string;
	imageUrl: string;
}

export interface Issue {
	id: number;
	title: string;
	isOpen: boolean;
	labels: Label[];
	author: Author;
	milestone: Milestone | null;
	assignees: Assignee[];
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	commentsCount: number;
}

// 전체 이슈 목록/페이지네이션 응답
export interface IssueListData {
	total: number;
	page: number;
	perPage: number;
	q: string;
	openCount: number;
	closedCount: number;
	issues: Issue[];
}

export type IssueDetailResponse = ApiResponse<IssueListData>;
