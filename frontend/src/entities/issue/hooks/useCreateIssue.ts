import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createIssue } from '../api/issueAPI';
import type { IssueCreateRequest } from '../model/issue.create.types';

export function useCreateIssue(onSuccess?: (id: number) => void) {
	return useMutation<number, Error, IssueCreateRequest>({
		mutationFn: createIssue,
		onSuccess: (id) => {
			onSuccess?.(id);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
