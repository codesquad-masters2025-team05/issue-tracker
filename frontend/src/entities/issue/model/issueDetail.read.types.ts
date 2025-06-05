import type { ApiResponse } from './api.types';

// Label
export interface Label {
	id: number;
	name: string;
	description: string;
	textColor: string;
	backgroundColor: string;
}

// Author / Assignee
export interface User {
	id: number;
	username: string;
	imageUrl: string;
}

// Milestone (상세 정보 포함)
export interface MilestoneDetail {
	id: number;
	name: string;
	description: string | null;
	deadline: string | null; // yyyy-mm-dd
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number; // 0~100
}

// Comment (실제 구조에 맞게 필요한 필드 추가)
export interface Comment {
	id: number;
	author: User;
	content: string;
	createdAt: string;
	updatedAt: string;
}

// IssueDetail
export interface IssueDetail {
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

// 상세 조회 응답 타입
export type IssueDetailResponse = ApiResponse<IssueDetail>;
