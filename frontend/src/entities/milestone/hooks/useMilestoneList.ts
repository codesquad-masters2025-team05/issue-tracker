import { useQuery } from '@tanstack/react-query';
import { fetchMilestones } from '../api/milestoneApi';
import type { MilestoneListData } from '../api/milestoneApi';

/**
 * 전체 마일스톤 목록을 가져오는 커스텀 훅
 */
export function useMilestoneList() {
	return useQuery<MilestoneListData, Error>({
		queryKey: ['milestones'],
		queryFn: fetchMilestones,
		// 필요에 따라 staleTime, enabled 등 옵션 추가 가능
	});
}
