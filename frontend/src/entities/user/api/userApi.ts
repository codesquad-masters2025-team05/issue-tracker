import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { UsersResponseDto } from '../model/user.types';

/** API에서 반환되는 data 필드 타입 */
export type UserListData = UsersResponseDto['data'];

/**
 * 전체 유저 목록을 가져옵니다.
 * - page, perPage 같은 파라미터가 필요하다면 URL에 쿼리스트링을 추가해 주세요.
 */
export async function fetchUsers(): Promise<UserListData> {
	const url = '/api/users?limit=2000';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: UsersResponseDto = await res.json();
	if (!json.success) throw new Error(json.error ?? '담당자 목록 조회 실패');
	return json.data;
}
