import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { IssueLabelOptionsResponseDto } from '../model/labelFilter.types';

/** API에서 반환되는 data 필드 타입 */
export type IssueLabelOptionsData = IssueLabelOptionsResponseDto['data'];

/**
 * 이슈 필터 드롭다운에서 쓸 레이블 옵션 목록을 가져옵니다.
 */
export async function fetchIssueLabelOptions(): Promise<IssueLabelOptionsData> {
	const url = '/api/issues/labels';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: IssueLabelOptionsResponseDto = await res.json();
	if (!json.success) throw new Error(json.error ?? '라벨 목록 조회 실패');
	return json.data;
}
