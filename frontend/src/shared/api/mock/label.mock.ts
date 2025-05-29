import type {
	LabelApiEntity,
	LabelListApiResponseDto,
} from '@/entities/label/model/label.types';

const labels: LabelApiEntity[] = [
	{
		id: 1,
		name: 'bug',
		description: '버그 관련 이슈',
		backgroundColor: '#FF3B30',
		textColor: '#FFFFFF',
	},
	{
		id: 2,
		name: 'documentation',
		description: '문서 관련 작업',
		backgroundColor: '#007AFF',
		textColor: '#FFFFFF',
	},
	{
		id: 3,
		name: 'feature',
		description: '새로운 기능 추가',
		backgroundColor: '#34C759',
		textColor: '#222222',
	},
	{
		id: 4,
		name: 'enhancement',
		description: '',
		backgroundColor: '#5856D6',
		textColor: '#FFFFFF',
	},
];

export const mockLabelListResponse: LabelListApiResponseDto = {
	success: true,
	data: {
		total: labels.length,
		page: 1,
		perPage: 10,
		labels,
	},
	error: null,
};
