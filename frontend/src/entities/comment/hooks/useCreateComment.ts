import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createComment } from '../api/commentAPI';
import type {
	CommentCreateRequest,
	CommentResponse,
} from '../model/comment.types';

export function useCreateComment(onSuccess?: () => void) {
	return useMutation<
		CommentResponse,
		Error,
		{ issueId: number; payload: CommentCreateRequest }
	>({
		mutationFn: ({ issueId, payload }) => createComment(issueId, payload),
		onSuccess: (_data) => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '코멘트 생성에 실패했습니다.');
		},
	});
}
