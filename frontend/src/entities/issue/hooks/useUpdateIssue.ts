import { useMutation } from '@tanstack/react-query';
import { updateIssue } from '../api/issueAPI';
import type { IssueUpdateRequest } from '../model/issue.types';

export function useUpdateIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<void, Error, { id: number; payload: IssueUpdateRequest }>({
		mutationFn: ({ id, payload }) => updateIssue(id, payload),
		onSuccess: (_data, variables) => {
			onSuccess?.(variables.id);
		},
		onError,
	});
}
