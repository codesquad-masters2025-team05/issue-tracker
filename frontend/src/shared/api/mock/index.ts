import type { ApiResponse } from '../types';
import { mockAuthorsResponse } from './author.mock';
import { mockIssuesResponse } from './issue.mock';
import { mockLabelListResponse } from './label.mock';
import { mockIssueMilestoneOptionsResponse } from './milestoneFilter.mock';
import { mockUsersResponse } from './user.mock';

/**s
 * 경로별 mock 데이터를 반환하는 유틸
 */

// 경로에 따른 mock 데이터 로더 매핑
export const mockLoaders = {
	'/api/issues': mockIssuesResponse, // ApiResponse<IssueListData>
	'/api/users': mockUsersResponse, // ApiResponse<UserListData>
	'/api/labels': mockLabelListResponse,
	'/api/issues/milestones': mockIssueMilestoneOptionsResponse,
	'/api/issues/authors': mockAuthorsResponse, // ApiResponse<AuthorListData>
} satisfies Record<string, ApiResponse<unknown>>;

/**
 * 주어진 경로에 매핑된 mock 데이터를 반환합니다.
 * @param path API 엔드포인트 경로
 * @throws 정의되지 않은 경로일 경우 Error
 */
export async function getMockResponse<T>(
	path: keyof typeof mockLoaders,
): Promise<T> {
	const loader = mockLoaders[path];
	if (!loader) {
		throw new Error(`알 수 없는 mock 경로: ${path}`);
	}
	return loader as T;
}
