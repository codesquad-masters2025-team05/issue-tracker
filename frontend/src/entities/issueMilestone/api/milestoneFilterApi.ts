import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { IssueMilestoneOptionsResponseDto } from '../model/milestoneFilter.types';

/** API에서 반환되는 data 필드 타입 */
export type IssueMilestoneOptionsData =
	IssueMilestoneOptionsResponseDto['data'];

/**
 * 이슈 필터용 마일스톤 옵션 목록을 가져옵니다.
 */
export async function fetchIssueMilestoneOptions(): Promise<IssueMilestoneOptionsData> {
	const url = '/api/issues/milestones?limit=2000';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: IssueMilestoneOptionsResponseDto = await res.json();
	if (!json.success) throw new Error(json.error ?? '마일스톤 목록 조회 실패');
	return json.data;
}
