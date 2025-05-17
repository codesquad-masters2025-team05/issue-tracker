import type { ApiResponse } from '../types';
import { mockAuthors } from './author.mock';
import { mockIssues } from './issue.mock';
import { mockUsers } from './user.mock';

/**s
 * 경로별 mock 데이터를 반환하는 유틸
 */

// 경로에 따른 mock 데이터 로더 매핑
const mockLoaders: Record<string, ApiResponse<unknown>> = {
	'/api/issues': mockIssues,
	'/api/users': mockUsers,
	'/api/issues/authors': mockAuthors,
};

/**
 * 주어진 경로에 매핑된 mock 데이터를 반환합니다.
 * @param path API 엔드포인트 경로
 * @throws 정의되지 않은 경로일 경우 Error
 */
export async function getMockData(path: string) {
	const loader = mockLoaders[path];
	if (!loader) {
		throw new Error(`알 수 없는 mock 경로: ${path}`);
	}
	return loader;
}
