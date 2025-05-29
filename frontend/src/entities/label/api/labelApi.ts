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
