import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateComment } from '../api/commentAPI';
import type {
	CommentResponse,
	CommentUpdateRequest,
} from '../model/comment.types';

export function useUpdateComment(onSuccess?: () => void) {
	return useMutation<
		CommentResponse,
		Error,
		{ commentId: number; payload: CommentUpdateRequest }
	>({
		mutationFn: ({ commentId, payload }) => updateComment(commentId, payload),
		onSuccess: (_data) => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '코멘트 수정에 실패했습니다.');
		},
	});
}
