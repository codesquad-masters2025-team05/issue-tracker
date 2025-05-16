import { getJSON } from '@/shared/api/client';
import type { ApiResponse, IssueListData } from '../model/issue.types';

export async function fetchIssues(): Promise<IssueListData> {
	const res = await getJSON<ApiResponse<IssueListData>>('/api/issues');
	return res.data;
}
