import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateIssue } from '../api/issueAPI';
import type { IssueUpdateRequest } from '../model/issue.types';

export function useUpdateIssue(onSuccess?: () => void) {
	return useMutation<void, Error, { id: number; payload: IssueUpdateRequest }>({
		mutationFn: ({ id, payload }) => updateIssue(id, payload),
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '이슈 수정에 실패했습니다.');
		},
	});
}
