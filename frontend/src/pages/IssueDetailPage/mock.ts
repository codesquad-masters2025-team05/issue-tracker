export const mockIssue = {
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
		imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
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
			imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
		},
	],
	milestone: {
		id: 2,
		name: 'v2',
		description: '2주차',
		deadline: '2025-06-12',
		isOpen: false,
		openIssueCount: 1,
		closedIssueCount: 3,
		progress: 75,
	},
	createdAt: '2024-04-29T15:00:00Z',
	updatedAt: '2024-04-29T15:00:00Z',
	comments: [
		{
			id: 11,
			content: 'Pariatur id recusandae a tempora. Cum dolorem ea enim.',
			author: {
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
			createdAt: '2024-04-29T15:00:00Z',
			updatedAt: '2024-04-29T15:00:00Z',
		},
		{
			id: 1,
			content: 'Great issue, well described.',
			author: {
				id: 1,
				username: 'raheem',
				imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
			},
			createdAt: '2025-05-31T15:00:00Z',
			updatedAt: '2025-05-31T15:00:00Z',
		},
		{
			id: 30,
			content: 'Closing this since it’s resolved.',
			author: {
				id: 10,
				username: 'mickie',
				imageUrl:
					'https://ui-avatars.com/api/?name=Tony+Stark&background=random',
			},
			createdAt: '2025-06-19T15:00:00Z',
			updatedAt: '2025-06-19T15:00:00Z',
		},
	],
};
