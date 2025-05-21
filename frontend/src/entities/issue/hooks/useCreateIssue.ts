import { useMutation } from '@tanstack/react-query';
import { createIssue } from '../api/issueAPI';
import type {
	IssueCreateRequest,
	IssueCreateResponse,
} from '../model/issue.types';

/**
 * 이슈 생성 API를 호출하는 커스텀 훅입니다.
 *
 * @returns {object} React Query의 mutation 객체를 반환합니다.
 *
 * @example
 * const { mutate, isPending, isSuccess, error, data } = useCreateIssue();
 * mutate({
 *   title: "이슈 제목",
 *   body: "이슈 내용",
 *   assigneeId: 1,
 *   labelIds: [1, 2],
 *   milestoneId: null
 * });
 *
 * // isPending: 요청 중 여부
 * // isSuccess: 성공 여부
 * // error: 에러 객체
 * // data: 응답 데이터 (이슈 ID 등)
 *
 * @description
 * - 'mutation'은 서버의 데이터(리소스)를 생성, 수정, 삭제하는 작업을 의미합니다.
 * - 이 훅은 React Query의 useMutation을 래핑해서, 이슈 생성 요청을 보낼 수 있게 합니다.
 * - 요청 성공/실패/진행 상태 등을 쉽게 관리할 수 있습니다.
 */
export function useCreateIssue(
	onSuccess?: (id: number) => void,
	onError?: (err: Error) => void,
) {
	return useMutation<IssueCreateResponse, Error, IssueCreateRequest>({
		mutationFn: createIssue,
		onSuccess: (data) => {
			if (data.success && typeof data.data === 'number') {
				onSuccess?.(data.data);
			} else {
				onError?.(new Error(data.error || '이슈 생성에 실패했습니다.'));
			}
		},
		onError,
	});
}
