import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../api/labelApi';
import type { LabelListApiResponseDto } from '../model/label.types';

export function useFetchLabelList() {
	return useQuery<LabelListApiResponseDto, Error>({
		queryKey: ['labels'],
		queryFn: fetchLabels,
	});
}
