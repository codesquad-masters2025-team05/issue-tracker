import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteIssue } from '../api/issueAPI';

export function useDeleteIssue(onSuccess?: () => void) {
	return useMutation<void, Error, number>({
		mutationFn: deleteIssue,
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
