import type { ApiResponse } from '@/shared/api/types';
import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type {
	MilestoneCountResponse,
	MilestoneCreatePayload,
	MilestoneCreateResponseDto,
	MilestoneDetail,
	MilestoneListData,
	MilestoneUpdatePayload,
} from '../model/milestone.types';

// 마일스톤 전체 리스트 조회
export async function fetchMilestones(): Promise<MilestoneListData> {
	const url = '/api/milestones?perPage=30';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: ApiResponse<MilestoneListData> = await res.json();
	if (!json.success) throw new Error(json.error ?? '마일스톤 목록 조회 실패');
	return json.data;
}

// 마일스톤 상세(강제 예시) - fetch + json 패턴 (에러 핸들링 직관적)
export interface MilestoneApiResponse<T> {
	success: boolean;
	data: T;
	error?: { message: string; code: number };
}

export async function fetchMilestoneDetail(
	id: number,
): Promise<MilestoneDetail> {
	const res = await fetch(`/api/milestones/${id}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneApiResponse<MilestoneDetail> = await res.json();
	if (!json.success)
		throw new Error(json.error?.message || '마일스톤 정보 가져오기 실패');
	return json.data;
}

// 마일스톤 생성
export async function createMilestone(
	payload: MilestoneCreatePayload,
): Promise<MilestoneCreateResponseDto> {
	const res = await fetch('/api/milestones', {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});
	return await res.json();
}

// 마일스톤 수정 (PUT)
export async function updateMilestone(
	payload: MilestoneUpdatePayload,
): Promise<void> {
	const { id, ...body } = payload;
	await fetch(`/api/milestones/${id}`, {
		method: 'PUT',
		headers: getAuthHeaders(),
		body: JSON.stringify(body),
	});
}

// 마일스톤 삭제
export async function deleteMilestone(id: number): Promise<void> {
	const res = await fetch(`/api/milestones/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(false),
	});
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error?.error ?? '마일스톤 삭제에 실패했습니다');
	}
}

// 마일스톤 카운트
export async function fetchMilestoneCount(): Promise<number> {
	const res = await fetch('/api/milestones/count', {
		method: 'GET',
		headers: getAuthHeaders(),
	});
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneCountResponse = await res.json();
	if (!json.success)
		throw new Error(json.error?.message || '카운트 가져오기 실패');
	return json.data;
}
