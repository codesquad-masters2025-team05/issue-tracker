import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { MilestonesResponseDto } from '../model/milestone.types';

/** API에서 반환되는 data 필드 타입 */
export type MilestoneListPageData = MilestonesResponseDto['data'];

/**
 * 마일스톤 목록 페이지에서 쓸 상세 정보 포함 마일스톤 리스트를 가져옵니다.
 */
export async function fetchMilestones(): Promise<MilestoneListPageData> {
	const res =
		await getJSON<ApiResponse<MilestoneListPageData>>('/api/milestones');
	return res.data;
}
