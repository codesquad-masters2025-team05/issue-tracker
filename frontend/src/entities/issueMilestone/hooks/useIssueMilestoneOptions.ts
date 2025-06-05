import { useQuery } from '@tanstack/react-query';
import { fetchIssueMilestoneOptions } from '../api/milestoneFilterApi';
import type { IssueMilestoneOptionsData } from '../api/milestoneFilterApi';

/**
 * 이슈 필터 드롭다운에서 쓸 마일스톤 옵션 목록을 가져오는 커스텀 훅
 */
export function useIssueMilestoneOptions() {
	return useQuery<IssueMilestoneOptionsData, Error>({
		queryKey: ['issueMilestoneOptions'],
		queryFn: fetchIssueMilestoneOptions,
	});
}
