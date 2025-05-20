import type { MilestoneListPageData } from '@/entities/milestone/api/milestoneApi';
import type { MilestoneApiDto } from '@/entities/milestone/model/milestone.types';
import type { ApiResponse } from '@/shared/api/types';

const milestones: MilestoneApiDto[] = [
	{
		id: 1,
		name: 'v1.0',
		description: '첫 번째 정식 버전 릴리즈',
		deadline: '2025-06-01',
		state: 'open',
		openIssueCount: 2,
		closedIssueCount: 5,
		progress: 71,
	},
	{
		id: 2,
		name: 'v0.9-beta',
		description: null,
		deadline: null,
		state: 'closed',
		openIssueCount: 0,
		closedIssueCount: 8,
		progress: 100,
	},
];

export const mockMilestoneListPageResponse: ApiResponse<MilestoneListPageData> =
	{
		success: true,
		data: {
			total: milestones.length,
			page: 1,
			perPage: 10,
			openCount: 1,
			closedCount: 1,
			milestones,
		},
		error: null,
	};
