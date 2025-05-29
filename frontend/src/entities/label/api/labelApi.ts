import { getJSON } from '@/shared/api/client';
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
): Promise<number> {
	const res = await fetch('/api/labels', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	const json: LabelCreateResponseDto = await res.json();
	return json.data;
}
