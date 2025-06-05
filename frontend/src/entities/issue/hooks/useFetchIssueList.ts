import { fetchIssues } from '@/entities/issue/api/issueAPI';
import type { IssueListData } from '@/entities/issue/model/issue.read.types';
import { useQuery } from '@tanstack/react-query';

export function useFetchIssueList(q: string, page?: number, perPage?: number) {
	return useQuery<IssueListData, Error>({
		queryKey: ['issues', q, page, perPage],
		queryFn: () => fetchIssues(q, page, perPage),
	});
}
