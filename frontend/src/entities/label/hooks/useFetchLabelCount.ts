import { useQuery } from '@tanstack/react-query';
import { fetchLabelCount } from '../api/labelApi';

export function useFetchLabelCount() {
	return useQuery<number, Error>({
		queryKey: ['labelCount'],
		queryFn: fetchLabelCount,
	});
}
