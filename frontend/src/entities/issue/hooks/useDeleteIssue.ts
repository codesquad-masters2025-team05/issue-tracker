import { useMutation } from '@tanstack/react-query';
import { deleteIssue } from '../api/issueAPI';
import type { IssueDeleteResponse } from '../model/issue.types';

/**
 * @description
 * 이슈 삭제(DELETE) 요청을 위한 커스텀 훅입니다.
 *
 * - 성공 시: onSuccess 콜백이 실행되며, 삭제된 이슈의 id를 전달합니다.
 * - 실패 시: onError 콜백이 실행됩니다.
 *
 * @param onSuccess 삭제 성공 시 실행할 콜백 (id: number) => void
 * @param onError 삭제 실패 시 실행할 콜백 (err: Error) => void
 * @returns useMutation 훅 인스턴스
 *
 * @example
 * const { mutate } = useDeleteIssue(
 *   (id) => { // 성공 },
 *   (err) => { // 실패 }
 * );
 * mutate(42); // 이슈 id
 */
export function useDeleteIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<IssueDeleteResponse, Error, number>({
		mutationFn: deleteIssue,
		onSuccess: (data) => {
			if (data.success && typeof data.data === 'number') {
				onSuccess?.(data.data);
			} else {
				onError?.(new Error(data.error || '이슈 삭제에 실패했습니다.'));
			}
		},
		onError,
	});
}
