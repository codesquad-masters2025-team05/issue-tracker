// API에서 내려오는 마일스톤 raw 타입
export interface MilestoneApiDto {
	id: number;
	name: string;
	description: string | null;
	deadline: string | null;
	state: 'open' | 'closed';
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}

// API 전체 응답 타입
export interface MilestonesResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		openCount: number;
		closedCount: number;
		milestones: MilestoneApiDto[];
	};
	error: string | null;
}

// FE에서 사용할 마일스톤 타입 (optional: 필요에 따라 커스텀)
export interface Milestone {
	id: number;
	name: string;
	description?: string | null;
	deadline?: string | null;
	state: 'open' | 'closed';
	openIssueCount: number;
	closedIssueCount: number;
	progress: number;
}
