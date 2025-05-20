import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { IssueLabelOptionsResponseDto } from '../model/labelFilter.types';

/** API에서 반환되는 data 필드 타입 */
export type IssueLabelOptionsData = IssueLabelOptionsResponseDto['data'];

/**
 * 이슈 필터 드롭다운에서 쓸 레이블 옵션 목록을 가져옵니다.
 */
export async function fetchIssueLabelOptions(): Promise<IssueLabelOptionsData> {
	const res =
		await getJSON<ApiResponse<IssueLabelOptionsData>>('/api/issues/labels');
	return res.data;
}
