import { useQuery } from '@tanstack/react-query';
import { fetchMilestones } from '../api/milestoneApi';
import type { MilestoneListPageData } from '../api/milestoneApi';

/**
 * 마일스톤 목록 페이지에서 쓸 마일스톤 리스트를 가져오는 커스텀 훅
 */
export function useMilestoneListPage() {
	return useQuery<MilestoneListPageData, Error>({
		queryKey: ['milestones-page'],
		queryFn: fetchMilestones,
	});
}
