import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../api/commentAPI';
import type { CommentResponse } from '../model/comment.types';

export function useDeleteComment(
	onSuccess?: () => void,
	onError?: (err: Error) => void,
) {
	return useMutation<CommentResponse, Error, number>({
		mutationFn: deleteComment,
		onSuccess: (data) => {
			if (data.success) {
				onSuccess?.();
			} else {
				onError?.(new Error(data.error || '코멘트 삭제에 실패했습니다.'));
			}
		},
		onError,
	});
}
