import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteIssue } from '../api/issueAPI';

export function useDeleteIssue(onSuccess?: (id: number) => void) {
	return useMutation<void, Error, number>({
		mutationFn: deleteIssue,
		onSuccess: (_data, id) => {
			onSuccess?.(id);
		},
		onError: (error) => {
			toast.error(error.message || '이슈 삭제에 실패했습니다.');
		},
	});
}
