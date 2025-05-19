import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../api/authorApi';
import type { AuthorListData } from '../api/authorApi';

export function useAuthorList() {
	return useQuery<AuthorListData, Error>({
		queryKey: ['authors'],
		queryFn: fetchAuthors,
		// 필요 시 staleTime, enabled 등 옵션 추가 가능
	});
}
