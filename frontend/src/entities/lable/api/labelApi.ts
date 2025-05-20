import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { LabelsResponseDto } from '../model/label.types';

/** API에서 반환되는 data 필드 타입 */
export type LabelListData = LabelsResponseDto['data'];

/**
 * 전체 레이블 목록을 가져옵니다.
 */
export async function fetchLabels(): Promise<LabelListData> {
	const res = await getJSON<ApiResponse<LabelListData>>('/api/labels');
	return res.data;
}
