import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
	MilestoneDetail,
	MilestonesResponseDto,
} from '../model/milestone.types';

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

import type { MilestoneCountResponse } from '../model/milestone.types';

export async function fetchMilestoneCount(): Promise<number> {
	const res = await fetch('/api/milestones/count');
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneCountResponse = await res.json();
	if (!json.success)
		throw new Error(json.error?.message || '카운트 가져오기 실패');
	return json.data;
}

export interface MilestoneApiResponse<T> {
	success: boolean;
	data: T;
	error?: {
		message: string;
		code: number;
	};
}

export async function fetchMilestoneDetail(
	id: number,
): Promise<MilestoneDetail> {
	const res = await fetch(`/api/milestones/${id}`);
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneApiResponse<MilestoneDetail> = await res.json();
	if (!json.success)
		throw new Error(json.error?.message || '마일스톤 정보 가져오기 실패');
	return json.data;
}
