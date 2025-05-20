import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
	IssueCreateRequest,
	IssueCreateResponse,
	IssueListData,
} from '../model/issue.types';

export async function fetchIssues(): Promise<IssueListData> {
	const res = await getJSON<ApiResponse<IssueListData>>('/api/issues');
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
