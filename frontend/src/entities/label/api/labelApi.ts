import { getJSON } from '@/shared/api/client';
import type {
	LabelListApiResponseDto,
	LabelListData,
} from '../model/label.types';

/**
 * 전체 레이블 목록을 가져옵니다.
 */
export async function fetchLabels(): Promise<LabelListData> {
	const res = await getJSON<LabelListApiResponseDto>('/api/labels');
	return res.data;
}
