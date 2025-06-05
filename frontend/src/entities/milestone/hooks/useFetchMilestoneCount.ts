import { useQuery } from '@tanstack/react-query';
import { fetchMilestoneCount } from '../api/milestoneApi';

export function useFetchMilestoneCount() {
	return useQuery<number, Error>({
		queryKey: ['milestoneCount'],
		queryFn: fetchMilestoneCount,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});
}
