import type { UserListData } from '@/entities/user/api/userApi';
import type { UserApiDto } from '@/entities/user/model/user.types';
import type { ApiResponse } from '@/shared/api/types';

// Mock user data
const users: UserApiDto[] = [
	{
		id: 1,
		username: 'user1',
		imageUrl: 'https://example.com/alice.png',
	},
	{
		id: 2,
		username: 'user2',
		imageUrl: 'https://example.com/bob.png',
	},
];

// Mock API response for user list
export const mockUserListResponse: ApiResponse<UserListData> = {
	success: true,
	data: {
		total: users.length,
		page: 0,
		perPage: users.length,
		users: users,
	},
	error: null,
};
