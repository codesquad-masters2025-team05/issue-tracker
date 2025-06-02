import { useQuery } from '@tanstack/react-query';
import { fetchMilestones } from '../api/milestoneApi';
import type { MilestoneListData } from '../model/milestone.types';

export function useFetchMilestoneList() {
	return useQuery<MilestoneListData, Error>({
		queryKey: ['milestones'],
		queryFn: fetchMilestones,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});
}
