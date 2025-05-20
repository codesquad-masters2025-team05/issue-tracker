import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { IssueMilestoneOptionsResponseDto } from '../model/milestoneFilter.types';

/** API에서 반환되는 data 필드 타입 */
export type IssueMilestoneOptionsData =
	IssueMilestoneOptionsResponseDto['data'];

/**
 * 이슈 필터용 마일스톤 옵션 목록을 가져옵니다.
 */
export async function fetchIssueMilestoneOptions(): Promise<IssueMilestoneOptionsData> {
	const res = await getJSON<ApiResponse<IssueMilestoneOptionsData>>(
		'/api/issues/milestones',
	);
	return res.data;
}
