import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
	IssueCreateRequest,
	IssueCreateResponse,
	IssueListData,
	IssueUpdateRequest,
	IssueUpdateResponse,
} from '../model/issue.types';

export async function fetchIssues(q = ''): Promise<IssueListData> {
	const url = q ? `/api/issues?q=${encodeURIComponent(q)}` : '/api/issues';
	const res = await getJSON<ApiResponse<IssueListData>>(url);
	return res.data;
}

export async function createIssue(
	payload: IssueCreateRequest,
): Promise<IssueCreateResponse> {
	const res = await fetch('/api/issues', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 인증 X
		},
		body: JSON.stringify(payload),
	});

	return res.json();
}

export async function updateIssue(
	id: number,
	payload: IssueUpdateRequest,
): Promise<IssueUpdateResponse> {
	const url = `/api/issues/${id}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	return res.json();
}
