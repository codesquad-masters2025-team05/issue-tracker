import { fetchIssueDetail } from '@/entities/issue/api/issueAPI';
import type { IssueDetailResponse } from '@/entities/issue/model/issue.types';
import { useQuery } from '@tanstack/react-query';

export function useFetchIssueDetail(id: number) {
	return useQuery<IssueDetailResponse, Error>({
		queryKey: ['issues', id],
		queryFn: () => fetchIssueDetail(id),
	});
}
