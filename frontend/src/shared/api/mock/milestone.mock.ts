import type { MilestoneListData } from '@/entities/milestone/api/milestoneApi';
import type { MilestoneApiDto } from '@/entities/milestone/model/milestone.types';
import type { ApiResponse } from '@/shared/api/types';

const milestones: MilestoneApiDto[] = [
	{ id: 1, name: '그룹프로젝트:이슈트래커' },
	{ id: 2, name: 'v0.9-beta' },
];

export const mockMilestoneListResponse: ApiResponse<MilestoneListData> = {
	success: true,
	data: {
		total: milestones.length,
		page: 1,
		perPage: 10,
		milestones,
	},
	error: null,
};
