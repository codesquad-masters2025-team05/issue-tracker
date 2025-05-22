import { fetchIssues } from '@/entities/issue/api/issueAPI';
import type { IssueListData } from '@/entities/issue/model/issue.types';
import { useQuery } from '@tanstack/react-query';

export function useIssueList(queryString: string) {
	return useQuery<IssueListData, Error>({
		queryKey: ['issues', queryString], // queryString이 캐시키에 들어감!
		queryFn: () => fetchIssues(queryString),
	});
}
