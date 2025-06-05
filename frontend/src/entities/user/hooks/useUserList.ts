import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/userApi';
import type { UserListData } from '../api/userApi';

export function useUserList() {
	return useQuery<UserListData, Error>({
		queryKey: ['users'],
		queryFn: fetchUsers,
		// staleTime, retry, enabled 등 옵션 필요에 따라 추가
	});
}
