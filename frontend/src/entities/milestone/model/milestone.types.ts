// API에서 내려오는 단일 Milestone
export interface MilestoneApiEntity {
	id: number;
	name: string;
	description: string;
	deadline?: string; // "YYYY-MM-DD" (없으면 undefined)
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number; // 0~100
}

// API 응답의 data 부분만 타입으로 분리
export interface MilestoneListData {
	total: number;
	page: number;
	perPage: number;
	milestones: MilestoneApiEntity[];
	openCount: number;
	closedCount: number;
}

// API 응답 - Milestone 리스트 (페이징 포함)
export interface MilestoneListApiResponseDto {
	success: boolean;
	data: MilestoneListData;
	error: { message: string; code: number } | null;
}

// API 응답 - 단일 Milestone
export interface MilestoneApiResponseDto {
	success: boolean;
	data: MilestoneApiEntity;
	error: { message: string; code: number } | null;
}

// 생성 입력값 (id 제외)
export interface MilestoneCreatePayload {
	name: string;
	description?: string;
	deadline?: string;
}

// 생성 응답값 (id)
export interface MilestoneCreateResponseDto {
	success: boolean;
	data: number; // 새로 생성된 id
	error: { message: string; code: number } | null;
}

// 수정 입력값 - 메서드는 put으로 전체 대체용
export interface MilestoneUpdatePayload {
	id: number;
	name: string;
	description?: string;
	deadline?: string;
}

// 프론트엔드 도메인 모델 (description/ deadline optional)
export interface Milestone {
	id: number;
	name: string;
	description?: string;
	deadline?: string;
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

export interface MilestoneCountResponse {
	success: boolean;
	data: number;
	error: { message: string; code: number } | null;
}
