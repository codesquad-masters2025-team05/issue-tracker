import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { AuthorApiDto, AuthorsResponseDto } from '../model/author.types';

/** API에서 반환되는 data 필드 타입 */
export type AuthorListData = AuthorsResponseDto['data'];

/**
 * 전체 작성자(Author) 목록을 가져옵니다.
 */
export async function fetchAuthors(): Promise<AuthorListData> {
	const res = await getJSON<ApiResponse<AuthorListData>>('/api/issues/authors');
	return res.data;
}

/**
 * 단일 작성자를 ID로 조회합니다.
 */
export async function fetchAuthorById(id: number): Promise<AuthorApiDto> {
	const res = await getJSON<ApiResponse<AuthorApiDto>>(
		`/api/issues/authors/${id}`,
	);
	return res.data;
}
