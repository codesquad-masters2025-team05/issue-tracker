// 마일스톤 상세(상세 조회에서 사용)
export interface MilestoneDetail {
	id: number;
	name: string;
	description: string | null;
	deadline: string | null; // "YYYY-MM-DD"
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

// 리스트/엔티티 공통 (description, deadline은 string | null로 맞추는 것이 일관)
export interface MilestoneApiEntity {
	id: number;
	name: string;
	description: string | null;
	deadline: string | null;
	isOpen: boolean;
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

// 리스트 데이터
export interface MilestoneListData {
	total: number;
	page: number;
	perPage: number;
	milestones: MilestoneApiEntity[];
	openCount: number;
	closedCount: number;
}

// API 응답 - 마일스톤 리스트
export interface MilestoneListApiResponseDto {
	success: boolean;
	data: MilestoneListData;
	error: { message: string; code: number } | null;
}

// API 응답 - 단일 마일스톤 (detail도 동일하게 받음)
export interface MilestoneApiResponseDto {
	success: boolean;
	data: MilestoneApiEntity;
	error: { message: string; code: number } | null;
}

// 생성 입력값 (id 제외)
export interface MilestoneCreatePayload {
	name: string;
	description?: string | null;
	deadline?: string | null;
}

// 생성 응답값 (id)
export interface MilestoneCreateResponseDto {
	success: boolean;
	data: number;
	error: { message: string; code: number } | null;
}

// 수정 입력값 - 전체 대체(put)
export interface MilestoneUpdatePayload {
	id: number;
	name: string;
	description?: string | null;
	deadline?: string | null;
}

// 도메인 모델 (프론트에서 사용할 때)
export interface Milestone extends MilestoneApiEntity {}

// 카운트 응답
export interface MilestoneCountResponse {
	success: boolean;
	data: number;
	error: { message: string; code: number } | null;
}
