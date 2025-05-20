// API 레이어가 반환하는 raw 타입
export interface MilestoneApiDto {
	id: number;
	name: string;
}

// API wrapper 전체 응답
export interface MilestonesResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		milestones: MilestoneApiDto[];
	};
	error: string | null;
}

// 프론트엔드에서 사용할 Milestone 타입
export interface Milestone {
	id: number;
	name: string;
}
