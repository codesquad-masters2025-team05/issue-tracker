import type { AuthorListData } from '@/entities/user/api/authorApi';
import type { AuthorApiDto } from '@/entities/user/model/author.types';
import type { ApiResponse } from '@/shared/api/types';

// Mock author data
const authors: AuthorApiDto[] = [
	{
		id: 1,
		username: 'Author1',
		imageUrl: 'https://example.com/avatar/alice.png',
	},
	{ id: 2, username: 'bob', imageUrl: 'https://example.com/avatar/bob.png' },
	{
		id: 3,
		username: 'Athour2',
		imageUrl: 'https://example.com/avatar/charlie.png',
	},
	{ id: 4, username: 'dave', imageUrl: 'https://example.com/avatar/dave.png' },
	{ id: 5, username: 'eve', imageUrl: 'https://example.com/avatar/eve.png' },
];

// Mock API response for author list
export const mockAuthors: ApiResponse<AuthorListData> = {
	success: true,
	data: {
		total: authors.length,
		page: 0,
		perPage: 0,
		users: authors,
	},
	error: null,
};
