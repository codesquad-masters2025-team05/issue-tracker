import { useQuery } from '@tanstack/react-query';
import { fetchMilestoneDetail } from '../api/milestoneApi';
import type { MilestoneDetail } from '../model/milestone.types';

export function useFetchMilestoneDetail(id: number) {
	return useQuery<MilestoneDetail, Error>({
		queryKey: ['milestoneDetail', id],
		queryFn: () => fetchMilestoneDetail(id),
		enabled: !!id,
	});
}
