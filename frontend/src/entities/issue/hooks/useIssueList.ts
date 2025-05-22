import { fetchIssues } from '@/entities/issue/api/issueAPI';
import type { IssueListData } from '@/entities/issue/model/issue.types';
import { useQuery } from '@tanstack/react-query';

export function useIssueList(q: string) {
	return useQuery<IssueListData, Error>({
		queryKey: ['issues', q],
		queryFn: () => fetchIssues(q),
	});
}
