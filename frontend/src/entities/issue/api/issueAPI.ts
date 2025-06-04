import { getAuthHeaders } from '@/shared/lib/getAuthHeaders';
import type { ApiResponse } from '../model/api.types';
import type {
	IssueCreateRequest,
	IssueCreateResponse,
} from '../model/issue.create.types';
import type { IssueListData } from '../model/issue.read.types';
import type { IssueUpdateRequest } from '../model/issue.update.types';
import type { IssueDetail } from '../model/issueDetail.read.types';

export async function fetchIssues(
	q = '',
	page?: number,
	perPage?: number,
): Promise<IssueListData> {
	let url = q ? `/api/issues?q=${encodeURIComponent(q)}` : '/api/issues';
	if (page !== undefined) url += `&page=${page}`;
	if (perPage !== undefined) url += `&perPage=${perPage}`;

	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: ApiResponse<IssueListData> = await res.json();
	if (!json.success)
		throw new Error(json.error?.message ?? '이슈 목록 조회 실패');
	return json.data;
}

export async function fetchIssueDetail(id: number): Promise<IssueDetail> {
	const url = `/api/issues/${id}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	const json: ApiResponse<IssueDetail> = await res.json();
	if (!json.success)
		throw new Error(json.error?.message ?? '이슈 상세 조회 실패');
	return json.data;
}

export async function createIssue(
	payload: IssueCreateRequest,
): Promise<number> {
	const res = await fetch('/api/issues', {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});

	const json: IssueCreateResponse = await res.json();
	if (!json.success) throw new Error(json.error?.message ?? '이슈 생성 실패');
	return json.data;
}

const keyToUrlMap: Record<string, string> = {
	assigneeIds: 'assignees',
	labelIds: 'labels',
	milestoneId: 'milestone',
	isOpen: 'status',
	title: 'title',
	body: 'body', // 필요하다면 추가
};

// 이슈 수정
export async function updateIssue(
	id: number,
	payload: IssueUpdateRequest,
): Promise<void> {
	const [key] = Object.keys(payload);
	const urlKey = keyToUrlMap[key] ?? key;
	const url = `/api/issues/${id}/${urlKey}`;

	const res = await fetch(url, {
		method: 'PATCH',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});

	if (res.status === 204) return;
	throw new Error('이슈 수정 실패');
}

// 이슈 삭제
export async function deleteIssue(id: number): Promise<void> {
	const url = `/api/issues/${id}`;
	const res = await fetch(url, {
		method: 'DELETE',
		headers: getAuthHeaders(false),
	});

	if (res.status === 204) return;
	throw new Error('이슈 삭제 실패');
}
