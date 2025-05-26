import { useMutation } from '@tanstack/react-query';
import { updateIssue } from '../api/issueAPI';
import type {
	IssueUpdateRequest,
	IssueUpdateResponse,
} from '../model/issue.types';

/**
 * @description
 * 이슈 수정(PATCH) 요청을 위한 커스텀 훅입니다.
 *
 * - 성공 시: `onSuccess` 콜백이 호출되고, 기본적으로 수정된 이슈의 id를 전달합니다.
 * - 실패 시: `onError` 콜백이 호출됩니다.
 *
 * @param onSuccess 수정 성공 시 실행할 콜백 (id: number) => void
 * @param onError 수정 실패 시 실행할 콜백 (err: Error) => void
 * @returns useMutation 훅 인스턴스
 *
 * @example
 * const { mutate } = useUpdateIssue(
 *   (id) => { // 성공 시 },
 *   (err) => { // 실패 시 }
 * );
 * mutate({ id: 1, ...payload });
 */
export function useUpdateIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<
		IssueUpdateResponse,
		Error,
		{ id: number; payload: IssueUpdateRequest }
	>({
		mutationFn: ({ id, payload }) => updateIssue(id, payload),
		onSuccess: (data) => {
			if (data.success && typeof data.data === 'number') {
				onSuccess?.(data.data);
			} else {
				onError?.(new Error(data.error || '이슈 수정에 실패했습니다.'));
			}
		},
		onError,
	});
}
