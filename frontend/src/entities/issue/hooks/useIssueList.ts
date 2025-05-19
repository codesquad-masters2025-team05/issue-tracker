import { fetchIssues } from '@/entities/issue/api/issueAPI';
import type { IssueListData } from '@/entities/issue/model/issue.types';
import { useQuery } from '@tanstack/react-query';

export function useIssueList() {
	return useQuery<IssueListData, Error>({
		queryKey: ['issues'],
		queryFn: fetchIssues,
		// 필요에 따라 staleTime, enabled, refetchInterval 등 옵션 추가 가능
	});
}
