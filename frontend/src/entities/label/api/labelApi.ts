import { getJSON } from '@/shared/api/client';
import type { LabelUpdatePayload } from '../model/label.types';
import type {
	LabelCreatePayload,
	LabelCreateResponseDto,
	LabelListApiResponseDto,
	LabelListData,
} from '../model/label.types';

export async function fetchLabels(): Promise<LabelListData> {
	const res = await getJSON<LabelListApiResponseDto>('/api/labels');
	return res.data;
}

export async function createLabel(
	payload: LabelCreatePayload,
): Promise<LabelCreateResponseDto> {
	const res = await fetch('/api/labels', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	return await res.json();
}

export async function updateLabel(payload: LabelUpdatePayload): Promise<void> {
	const { id, ...body } = payload;
	const res = await fetch(`/api/labels/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}

export async function deleteLabel(id: number): Promise<void> {
	const res = await fetch(`/api/labels/${id}`, {
		method: 'DELETE',
	});
	if (!res.ok) {
		// 서버에서 JSON 에러 메시지를 줄 수 있으니, 필요하다면 아래처럼 처리 가능
		const error = await res.json().catch(() => ({}));
		throw new Error(error?.error ?? '레이블 삭제에 실패했습니다');
	}
}
