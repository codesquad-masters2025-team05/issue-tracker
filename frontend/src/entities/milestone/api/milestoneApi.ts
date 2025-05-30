import { getJSON } from '@/shared/api/client';
import type {
	MilestoneApiEntity,
	MilestoneApiResponseDto,
	MilestoneCountResponse,
	MilestoneCreatePayload,
	MilestoneCreateResponseDto,
	MilestoneDetail,
	MilestoneListApiResponseDto,
	MilestoneListData,
	MilestoneUpdatePayload,
} from '../model/milestone.types';

// 마일스톤 전체 리스트 조회
export async function fetchMilestones(): Promise<MilestoneListData> {
	const res = await getJSON<MilestoneListApiResponseDto>('/api/milestones');
	return res.data;
}

// 마일스톤 단일(상세) 조회 (id 기준)
export async function fetchMilestone(id: number): Promise<MilestoneApiEntity> {
	const res = await getJSON<MilestoneApiResponseDto>(`/api/milestones/${id}`);
	return res.data;
}

// 마일스톤 상세(강제 예시) - fetch + json 패턴 (에러 핸들링 직관적)
export interface MilestoneApiResponse<T> {
	success: boolean;
	data: T;
	error?: { message: string; code: number };
}
export async function fetchMilestoneDetail(id: number): Promise<MilestoneDetail> {
	const res = await fetch(`/api/milestones/${id}`);
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneApiResponse<MilestoneDetail> = await res.json();
	if (!json.success) throw new Error(json.error?.message || '마일스톤 정보 가져오기 실패');
	return json.data;
}

// 마일스톤 생성
export async function createMilestone(payload: MilestoneCreatePayload): Promise<MilestoneCreateResponseDto> {
	const res = await fetch('/api/milestones', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return await res.json();
}

// 마일스톤 수정 (PUT)
export async function updateMilestone(payload: MilestoneUpdatePayload): Promise<void> {
	const { id, ...body } = payload;
	await fetch(`/api/milestones/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}

// 마일스톤 삭제
export async function deleteMilestone(id: number): Promise<void> {
	const res = await fetch(`/api/milestones/${id}`, { method: 'DELETE' });
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error?.error ?? '마일스톤 삭제에 실패했습니다');
	}
}

// 마일스톤 카운트
export async function fetchMilestoneCount(): Promise<number> {
	const res = await fetch('/api/milestones/count');
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: MilestoneCountResponse = await res.json();
	if (!json.success) throw new Error(json.error?.message || '카운트 가져오기 실패');
	return json.data;
}
