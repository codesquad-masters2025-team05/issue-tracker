import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../api/labelApi';
import type { LabelListData } from '../api/labelApi';

/**
 * 전체 레이블 목록을 가져오는 커스텀 훅
 */
export function useLabelList() {
	return useQuery<LabelListData, Error>({
		queryKey: ['labels'],
		queryFn: fetchLabels,
		// 필요에 따라 staleTime, enabled 등 옵션 추가 가능
	});
}
