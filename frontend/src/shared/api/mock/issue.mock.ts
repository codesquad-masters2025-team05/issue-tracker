import type {
	IssueListData,
	IssueListItem,
} from '@/entities/issue/model/issue.types';
import type { ApiResponse } from '@/shared/api/types';

const issues: IssueListItem[] = [
	{
		id: 11,
		title: 'hello',
		isOpen: true,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
		],
		author: {
			id: 1,
			username: 'raheem',
		},
		milestone: {
			id: 1,
			name: 'v1',
		},
		assignees: [
			{
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
		],
		createdAt: '2025-05-27T03:13:44Z',
		updatedAt: '2025-05-27T03:13:44Z',
		commentsCount: 0,
	},
	{
		id: 1,
		title: '자동 로그아웃 현상',
		isOpen: true,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
		],
		author: {
			id: 1,
			username: 'raheem',
		},
		milestone: {
			id: 2,
			name: 'v2',
		},
		assignees: [
			{
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
			{
				id: 2,
				username: 'genevieve',
				imageUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
			},
			{
				id: 5,
				username: 'annamarie',
				imageUrl:
					'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
			},
		],
		createdAt: '2024-04-29T15:00:00Z',
		updatedAt: '2024-04-29T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 2,
		title: '다크모드 적용 오류',
		isOpen: false,
		labels: [
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
			{
				id: 4,
				name: 'documentation',
				description: 'Improvements or additions to documentation.',
				textColor: '#ffffff',
				backgroundColor: '#0075ca',
			},
		],
		author: {
			id: 9,
			username: 'jeraldine',
		},
		milestone: {
			id: 4,
			name: 'v4',
		},
		assignees: [
			{
				id: 2,
				username: 'genevieve',
				imageUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
			},
			{
				id: 4,
				username: 'dalton',
				imageUrl:
					'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
			},
			{
				id: 6,
				username: 'luz',
				imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
			},
		],
		createdAt: '2024-04-28T15:00:00Z',
		updatedAt: '2024-04-28T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 3,
		title: '파일 업로드 실패',
		isOpen: false,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 4,
				name: 'documentation',
				description: 'Improvements or additions to documentation.',
				textColor: '#ffffff',
				backgroundColor: '#0075ca',
			},
			{
				id: 5,
				name: 'good first issue',
				description: 'Good for newcomers.',
				textColor: '#000000',
				backgroundColor: '#7057ff',
			},
		],
		author: {
			id: 8,
			username: 'russ',
		},
		milestone: {
			id: 2,
			name: 'v2',
		},
		assignees: [
			{
				id: 3,
				username: 'janyce',
				imageUrl:
					'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
			},
			{
				id: 6,
				username: 'luz',
				imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
			},
			{
				id: 7,
				username: 'sammie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
			},
		],
		createdAt: '2024-04-27T15:00:00Z',
		updatedAt: '2024-04-27T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 4,
		title: '접근 권한 설정 문제',
		isOpen: false,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 5,
				name: 'good first issue',
				description: 'Good for newcomers.',
				textColor: '#000000',
				backgroundColor: '#7057ff',
			},
		],
		author: {
			id: 3,
			username: 'janyce',
		},
		milestone: {
			id: 5,
			name: 'v5',
		},
		assignees: [
			{
				id: 4,
				username: 'dalton',
				imageUrl:
					'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
			},
			{
				id: 8,
				username: 'russ',
				imageUrl:
					'https://ui-avatars.com/api/?name=Luke+Skywalker&background=random',
			},
			{
				id: 9,
				username: 'jeraldine',
				imageUrl:
					'https://ui-avatars.com/api/?name=Leia+Organa&background=random',
			},
		],
		createdAt: '2024-04-26T15:00:00Z',
		updatedAt: '2024-04-26T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 5,
		title: '모바일 화면 깨짐',
		isOpen: false,
		labels: [
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
			{
				id: 4,
				name: 'documentation',
				description: 'Improvements or additions to documentation.',
				textColor: '#ffffff',
				backgroundColor: '#0075ca',
			},
			{
				id: 5,
				name: 'good first issue',
				description: 'Good for newcomers.',
				textColor: '#000000',
				backgroundColor: '#7057ff',
			},
		],
		author: {
			id: 8,
			username: 'russ',
		},
		milestone: {
			id: 2,
			name: 'v2',
		},
		assignees: [
			{
				id: 5,
				username: 'annamarie',
				imageUrl:
					'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
			},
			{
				id: 9,
				username: 'jeraldine',
				imageUrl:
					'https://ui-avatars.com/api/?name=Leia+Organa&background=random',
			},
			{
				id: 10,
				username: 'mickie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Tony+Stark&background=random',
			},
		],
		createdAt: '2024-04-25T15:00:00Z',
		updatedAt: '2024-04-25T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 6,
		title: '계정 삭제 요청 기능 추가',
		isOpen: true,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
		],
		author: {
			id: 2,
			username: 'genevieve',
		},
		milestone: {
			id: 4,
			name: 'v4',
		},
		assignees: [
			{
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
			{
				id: 6,
				username: 'luz',
				imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
			},
			{
				id: 10,
				username: 'mickie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Tony+Stark&background=random',
			},
		],
		createdAt: '2024-04-24T15:00:00Z',
		updatedAt: '2024-04-24T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 7,
		title: '라벨이 저장되지 않아요',
		isOpen: true,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 4,
				name: 'documentation',
				description: 'Improvements or additions to documentation.',
				textColor: '#ffffff',
				backgroundColor: '#0075ca',
			},
		],
		author: {
			id: 5,
			username: 'annamarie',
		},
		milestone: {
			id: 5,
			name: 'v5',
		},
		assignees: [
			{
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
			{
				id: 3,
				username: 'janyce',
				imageUrl:
					'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
			},
			{
				id: 7,
				username: 'sammie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
			},
		],
		createdAt: '2024-04-23T15:00:00Z',
		updatedAt: '2024-04-23T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 8,
		title: '알림 기능이 작동하지 않아요',
		isOpen: true,
		labels: [
			{
				id: 2,
				name: 'enhancement',
				description: 'New feature or request.',
				textColor: '#ffffff',
				backgroundColor: '#a2eeef',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
			{
				id: 5,
				name: 'good first issue',
				description: 'Good for newcomers.',
				textColor: '#000000',
				backgroundColor: '#7057ff',
			},
		],
		author: {
			id: 3,
			username: 'janyce',
		},
		milestone: {
			id: 5,
			name: 'v5',
		},
		assignees: [
			{
				id: 2,
				username: 'genevieve',
				imageUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
			},
			{
				id: 5,
				username: 'annamarie',
				imageUrl:
					'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
			},
			{
				id: 8,
				username: 'russ',
				imageUrl:
					'https://ui-avatars.com/api/?name=Luke+Skywalker&background=random',
			},
		],
		createdAt: '2024-04-22T15:00:00Z',
		updatedAt: '2024-04-22T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 9,
		title: '댓글 작성이 안돼요',
		isOpen: false,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
			{
				id: 4,
				name: 'documentation',
				description: 'Improvements or additions to documentation.',
				textColor: '#ffffff',
				backgroundColor: '#0075ca',
			},
		],
		author: {
			id: 7,
			username: 'sammie',
		},
		milestone: null,
		assignees: [
			{
				id: 3,
				username: 'janyce',
				imageUrl:
					'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
			},
			{
				id: 7,
				username: 'sammie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
			},
			{
				id: 9,
				username: 'jeraldine',
				imageUrl:
					'https://ui-avatars.com/api/?name=Leia+Organa&background=random',
			},
		],
		createdAt: '2024-04-21T15:00:00Z',
		updatedAt: '2024-04-21T15:00:00Z',
		commentsCount: 0,
	},
	{
		id: 10,
		title: '이메일 인증이 오지 않아요',
		isOpen: false,
		labels: [
			{
				id: 1,
				name: 'bug',
				description: "Something isn't working.",
				textColor: '#000000',
				backgroundColor: '#d73a4a',
			},
			{
				id: 3,
				name: 'question',
				description: 'Further information is requested.',
				textColor: '#ffffff',
				backgroundColor: '#d876e3',
			},
			{
				id: 5,
				name: 'good first issue',
				description: 'Good for newcomers.',
				textColor: '#000000',
				backgroundColor: '#7057ff',
			},
		],
		author: {
			id: 4,
			username: 'dalton',
		},
		milestone: {
			id: 2,
			name: 'v2',
		},
		assignees: [
			{
				id: 4,
				username: 'dalton',
				imageUrl:
					'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
			},
			{
				id: 9,
				username: 'jeraldine',
				imageUrl:
					'https://ui-avatars.com/api/?name=Leia+Organa&background=random',
			},
			{
				id: 10,
				username: 'mickie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Tony+Stark&background=random',
			},
		],
		createdAt: '2024-04-20T15:00:00Z',
		updatedAt: '2024-04-20T15:00:00Z',
		commentsCount: 0,
	},
];

export const mockIssuesResponse: ApiResponse<IssueListData> = {
	success: true,
	data: {
		total: issues.length,
		page: 1,
		q: '',
		perPage: issues.length,
		issues,
	},
	error: null,
};
