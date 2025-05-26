import { useMutation } from '@tanstack/react-query';
import { createComment } from '../api/commentAPI';
import type {
	CommentCreateRequest,
	CommentResponse,
} from '../model/comment.types';

export function useCreateComment(
	onSuccess?: () => void,
	onError?: (err: Error) => void,
) {
	return useMutation<
		CommentResponse,
		Error,
		{ issueId: number; payload: CommentCreateRequest }
	>({
		mutationFn: ({ issueId, payload }) => createComment(issueId, payload),
		onSuccess: (data) => {
			if (data.success) {
				onSuccess?.();
			} else {
				onError?.(new Error(data.error || '코멘트 생성에 실패했습니다.'));
			}
		},
		onError,
	});
}
