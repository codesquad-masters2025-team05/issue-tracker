import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { MilestonesResponseDto } from '../model/milestone.types';

/** API에서 반환되는 data 필드 타입 */
export type MilestoneListData = MilestonesResponseDto['data'];

/**
 * 전체 마일스톤 목록을 가져옵니다.
 */
export async function fetchMilestones(): Promise<MilestoneListData> {
	const res = await getJSON<ApiResponse<MilestoneListData>>(
		'/api/issues/milestones',
	);
	return res.data;
}
