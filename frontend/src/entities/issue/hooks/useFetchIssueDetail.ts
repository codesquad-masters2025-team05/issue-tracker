import { fetchIssueDetail } from '@/entities/issue/api/issueAPI';
import { useQuery } from '@tanstack/react-query';
import type { IssueDetail } from '../model/issueDetail.read.types';

export function useFetchIssueDetail(id: number) {
	return useQuery<IssueDetail, Error>({
		queryKey: ['issues', id],
		queryFn: () => fetchIssueDetail(id),
		staleTime: 1000 * 60,
	});
}
