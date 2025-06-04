import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { AuthorsResponseDto } from '../model/author.types';

/** API에서 반환되는 data 필드 타입 */
export type AuthorListData = AuthorsResponseDto['data'];

/**
 * 전체 작성자(Authors) 목록을 가져옵니다.
 */
export async function fetchAuthors(): Promise<AuthorListData> {
	const url = '/api/issues/authors?limit=2000';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: AuthorsResponseDto = await res.json();
	if (!json.success) throw new Error(json.error ?? '작성자 목록 조회 실패');
	return json.data;
}
