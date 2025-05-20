import type { IssueMilestoneOptionsData } from '@/entities/issueMilestone/api/milestoneFilterApi';
import type { IssueMilestoneOptionApiDto } from '@/entities/issueMilestone/model/milestoneFilter.types';
import type { ApiResponse } from '@/shared/api/types';

const milestones: IssueMilestoneOptionApiDto[] = [
	{ id: 1, name: '그룹프로젝트:이슈트래커' },
	{ id: 2, name: 'v0.9-beta' },
];

export const mockIssueMilestoneOptionsResponse: ApiResponse<IssueMilestoneOptionsData> =
	{
		success: true,
		data: {
			total: milestones.length,
			page: 1,
			perPage: 10,
			milestones,
		},
		error: null,
	};
