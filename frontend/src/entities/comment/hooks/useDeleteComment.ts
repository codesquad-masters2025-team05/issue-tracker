import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteComment } from '../api/commentAPI';

export function useDeleteComment(onSuccess?: () => void) {
	return useMutation<void, Error, number>({
		mutationFn: deleteComment,
		onSuccess: (_data) => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '코멘트 삭제에 실패했습니다.');
		},
	});
}
