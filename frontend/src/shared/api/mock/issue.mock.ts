import type { Issue, IssueListData } from '@/entities/issue/model/issue.types';
import type { ApiResponse } from '@/shared/api/types';

const issues: Issue[] = [
	{
		id: 42,
		title: '버튼 클릭 시 모달이 열리지 않는 문제',
		labels: [
			{
				id: 1,
				name: 'bug',
				textColor: '#fff',
				backgroundColor: '#d73a4a',
			},
			{
				id: 3,
				name: 'ui',
				textColor: '#fff',
				backgroundColor: '#d73a4a',
			},
		],
		author: {
			id: 7,
			username: 'alice',
			imageUrl: 'https://example.com/avatar/alice.png',
		},
		milestone: {
			id: 2,
			name: 'v1.0 릴리즈',
		},
		createdAt: '2025-05-01T09:15:00Z',
		updatedAt: '2025-05-10T10:11:00Z',
		commentsCount: 4,
		open: true,
	},
	{
		id: 43,
		number: 1235,
		title: '로그인 API 응답 속도 개선 요청',
		labels: [
			{
				id: 2,
				name: 'enhancement',
				textColor: '#fff',
				backgroundColor: '#d73a4a',
			},
		],
		author: {
			id: 9,
			username: 'bob',
			imageUrl: 'https://example.com/avatar/bob.png',
		},
		milestone: null,
		createdAt: '2025-04-28T14:03:00Z',
		updatedAt: null,
		commentsCount: 2,
		open: false,
	},
];

export const mockIssuesResponse: ApiResponse<IssueListData> = {
	success: true,
	data: {
		total: issues.length,
		page: 1,
		perPage: issues.length,
		issues,
	},
	error: null,
};
