import { useMutation } from '@tanstack/react-query';
import { deleteIssue } from '../api/issueAPI';

export function useDeleteIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<void, Error, number>({
		mutationFn: deleteIssue,
		onSuccess: (_data, id) => {
			onSuccess?.(id);
		},
		onError,
	});
}
