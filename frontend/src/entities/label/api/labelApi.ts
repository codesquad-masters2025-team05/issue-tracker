import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { LabelCountResponse } from '../model/label.types';
import type { LabelUpdatePayload } from '../model/label.types';
import type {
	LabelCreatePayload,
	LabelCreateResponseDto,
	LabelListApiResponseDto,
	LabelListData,
} from '../model/label.types';

export async function fetchLabels(): Promise<LabelListData> {
	const url = '/api/labels?perPage=30';
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: LabelListApiResponseDto = await res.json();
	// if (!json.success)
	// 	throw new Error(json.error?.message ?? '라벨 조회 실패');
	return json.data;
}

export async function createLabel(
	payload: LabelCreatePayload,
): Promise<LabelCreateResponseDto> {
	const res = await fetch('/api/labels', {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});

	return await res.json();
}

export async function updateLabel(payload: LabelUpdatePayload): Promise<void> {
	const { id, ...body } = payload;
	const res = await fetch(`/api/labels/${id}`, {
		method: 'PUT',
		headers: getAuthHeaders(),
		body: JSON.stringify(body),
	});
	if (res.status === 204) return;
	throw new Error('라벨 수정 실패');
}

export async function deleteLabel(id: number): Promise<void> {
	const res = await fetch(`/api/labels/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(false),
	});
	if (res.status === 204) return;
	throw new Error('이슈 수정 실패');
}

export async function fetchLabelCount(): Promise<number> {
	const res = await fetch('/api/labels/count', {
		method: 'GET',
		headers: getAuthHeaders(),
	});
	if (!res.ok) throw new Error('서버 연결에 실패했습니다.');
	const json: LabelCountResponse = await res.json();
	if (!json.success)
		throw new Error(json.error?.message || '카운트 가져오기 실패');
	return json.data;
}
