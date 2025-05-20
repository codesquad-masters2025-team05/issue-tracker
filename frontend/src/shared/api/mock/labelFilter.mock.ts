import type { IssueLabelOptionsData } from '@/entities/issueLabel/api/labelFilterApi';
import type { IssueLabelOptionApiDto } from '@/entities/issueLabel/model/labelFilter.types';
import type { ApiResponse } from '@/shared/api/types';

const labels: IssueLabelOptionApiDto[] = [
	{
		id: 1,
		name: 'bug',
		backgroundColor: '#FF3B30',
		textColor: '#FFFFFF',
	},
	{
		id: 2,
		name: 'documentation',
		backgroundColor: '#007AFF',
		textColor: '#FFFFFF',
	},
	{
		id: 3,
		name: 'feature',
		backgroundColor: '#34C759',
		textColor: '#222222',
	},
	{
		id: 4,
		name: 'enhancement',
		backgroundColor: '#5856D6',
		textColor: '#FFFFFF',
	},
];

export const mockIssueLabelOptionsResponse: ApiResponse<IssueLabelOptionsData> =
	{
		success: true,
		data: {
			total: labels.length,
			page: 1,
			perPage: 10,
			labels,
		},
		error: null,
	};
