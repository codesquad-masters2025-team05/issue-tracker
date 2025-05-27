import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteComment } from '../api/commentAPI';
import type { CommentResponse } from '../model/comment.types';

export function useDeleteComment(onSuccess?: () => void) {
	return useMutation<CommentResponse, Error, number>({
		mutationFn: deleteComment,
		onSuccess: (_data) => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '코멘트 삭제에 실패했습니다.');
		},
	});
}
