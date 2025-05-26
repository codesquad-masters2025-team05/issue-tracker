import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../api/commentAPI';
import type {
	CommentResponse,
	CommentUpdateRequest,
} from '../model/comment.types';

export function useUpdateComment(
	onSuccess?: () => void,
	onError?: (err: Error) => void,
) {
	return useMutation<
		CommentResponse,
		Error,
		{ commentId: number; payload: CommentUpdateRequest }
	>({
		mutationFn: ({ commentId, payload }) => updateComment(commentId, payload),
		onSuccess: (data) => {
			if (data.success) {
				onSuccess?.();
			} else {
				onError?.(new Error(data.error || '코멘트 수정에 실패했습니다.'));
			}
		},
		onError,
	});
}
