import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { LabelListApiResponseDto } from '../model/label.types';

/**
 * 전체 레이블 목록을 가져옵니다.
 */
export async function fetchLabels(): Promise<LabelListApiResponseDto> {
	const res =
		await getJSON<ApiResponse<LabelListApiResponseDto>>('/api/labels');
	return res.data;
}
