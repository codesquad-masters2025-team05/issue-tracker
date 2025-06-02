import { useQuery } from '@tanstack/react-query';
import { fetchLabelCount } from '../api/labelApi';

export function useFetchLabelCount() {
	return useQuery<number, Error>({
		queryKey: ['labelCount'],
		queryFn: fetchLabelCount,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});
}
