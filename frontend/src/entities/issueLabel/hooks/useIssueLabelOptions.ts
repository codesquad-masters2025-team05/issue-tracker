import { useQuery } from '@tanstack/react-query';
import { fetchIssueLabelOptions } from '../api/labelFilterApi';
import type { IssueLabelOptionsData } from '../api/labelFilterApi';

/**
 * 이슈 필터 드롭다운에서 쓸 레이블 옵션 목록을 가져오는 커스텀 훅
 */
export function useIssueLabelOptions() {
	return useQuery<IssueLabelOptionsData, Error>({
		queryKey: ['issueLabelOptions'],
		queryFn: fetchIssueLabelOptions,
		staleTime: 1000 * 60 * 10, // 10분 동안 캐시에서만 제공
	});
}
