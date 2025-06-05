import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateIssue } from '../api/issueAPI';
import type { IssueUpdateRequest } from '../model/issue.update.types';

const updateIssueMessageMap: Record<
	keyof IssueUpdateRequest,
	(payload: IssueUpdateRequest) => string
> = {
	title: () => '제목을 수정했습니다.',
	assigneeIds: () => '담당자를 수정했습니다.',
	labelIds: () => '레이블을 수정했습니다.',
	milestoneId: () => '마일스톤을 수정했습니다.',
	isOpen: (payload) =>
		payload.isOpen ? '이슈를 열었습니다.' : '이슈를 닫았습니다.',
};

export function useUpdateIssue(onSuccess?: () => void) {
	return useMutation<void, Error, { id: number; payload: IssueUpdateRequest }>({
		mutationFn: ({ id, payload }) => updateIssue(id, payload),
		onSuccess: (_data, variables) => {
			const { payload } = variables;
			const key = Object.keys(payload)[0] as keyof IssueUpdateRequest;

			const getMessage = updateIssueMessageMap[key];
			if (getMessage) {
				toast.success(getMessage(payload));
			}

			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
