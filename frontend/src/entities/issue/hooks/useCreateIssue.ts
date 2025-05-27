import { useMutation } from '@tanstack/react-query';
import { createIssue } from '../api/issueAPI';
import type { IssueCreateRequest } from '../model/issue.types';

export function useCreateIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<number, Error, IssueCreateRequest>({
		mutationFn: createIssue,
		onSuccess: (id) => {
			onSuccess?.(id);
		},
		onError,
	});
}
