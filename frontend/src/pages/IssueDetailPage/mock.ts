export const mockIssue = {
	id: 42,
	// number 제거
	title: '버튼 클릭 시 모달이 열리지 않는 문제',
	// body 제거
	isOpen: true,
	labels: [
		{ id: 1, name: 'bug', textColor: '#d73a4a', backgroundColor: '#d73a4a' },
		{ id: 3, name: 'ui', textColor: '#d73a4a', backgroundColor: '#d73a4a' },
	],
	author: {
		id: 7,
		username: 'alice',
		imageUrl: 'https://example.com/avatar/alice.png',
	},
	assignees: [
		{
			id: 9,
			username: 'bob',
			imageUrl: 'https://example.com/avatar/bob.png',
		},
	],
	milestone: {
		id: 1,
		name: 'v1.0',
		description: '첫 번째 정식 버전 릴리즈',
		deadline: '2025-06-01',
		isOpen: true,
		openIssueCount: 2,
		closedIssueCount: 5,
		progress: 71,
	},
	createdAt: '2025-05-01T09:15:00Z',
	updatedAt: '2025-05-03T13:42:00Z',
	comments: [
		{
			id: 101,
			content: '저도 동일 현상 보고했습니다. 크롬 113.0.0에서 발생하네요.',
			author: {
				id: 7,
				username: 'alice',
				imageUrl: 'https://example.com/avatar/bob.png',
			},
			createdAt: '2025-05-01T10:02:00Z',
			updatedAt: '2025-05-01T10:02:00Z',
			attachments: [],
		},
		{
			id: 102,
			content:
				'해당 이슈 수정 PR(#256) 머지되어 배포됐습니다. 확인 부탁드립니다.',
			author: {
				id: 8,
				username: 'carol',
				imageUrl: 'https://example.com/avatar/carol.png',
			},
			createdAt: '2025-05-03T13:40:00Z',
			updatedAt: '2025-05-01T10:02:00Z',
			attachments: [
				{
					id: 201,
					fileName: 'fix-screenshot.png',
					url: 'https://example.com/uploads/fix-screenshot.png',
				},
			],
		},
	],
};
