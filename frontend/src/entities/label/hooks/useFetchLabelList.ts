import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../api/labelApi';
import type { LabelListData } from '../model/label.types';

export function useFetchLabelList() {
	return useQuery<LabelListData, Error>({
		queryKey: ['labels'],
		queryFn: fetchLabels,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});
}
