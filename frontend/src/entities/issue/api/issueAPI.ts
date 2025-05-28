import { getJSON } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
	IssueCreateRequest,
	IssueCreateResponse,
	IssueDeleteResponse,
	IssueDetailData,
	IssueListData,
	IssueUpdateRequest,
	IssueUpdateResponse,
} from '../model/issue.types';

// 이슈 목록 조회
export async function fetchIssues(q = ''): Promise<IssueListData> {
	const url = q ? `/api/issues?q=${encodeURIComponent(q)}` : '/api/issues';
	const res = await getJSON<ApiResponse<IssueListData>>(url);
	if (!res.success) throw new Error(res.error ?? '이슈 목록 조회 실패');
	return res.data;
}

// 이슈 상세 조회
export async function fetchIssueDetail(id: number): Promise<IssueDetailData> {
	const url = `/api/issues/${id}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	const json: ApiResponse<IssueDetailData> = await res.json();
	if (!json.success) throw new Error(json.error ?? '이슈 상세 조회 실패');
	return json.data;
}

// 이슈 생성
export async function createIssue(
	payload: IssueCreateRequest,
): Promise<IssueCreateResponse['data']> {
	// 실제 data만 반환
	const res = await fetch('/api/issues', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	const json: IssueCreateResponse = await res.json();
	if (!json.success) throw new Error(json.error ?? '이슈 생성 실패');
	return json.data; // 실제 새로 생성된 id 등 "진짜 데이터"만 반환
}

// 이슈 수정
export async function updateIssue(
	id: number,
	payload: IssueUpdateRequest,
): Promise<void> {
	const [key] = Object.keys(payload);

	const url = `/api/issues/${id}/${key === 'isOpen' ? 'status' : key}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	const json: IssueUpdateResponse = await res.json();
	if (!json.success) throw new Error(json.error ?? '이슈 수정 실패');
	// 성공이면 아무것도 리턴하지 않음
}

// 이슈 삭제
export async function deleteIssue(id: number): Promise<void> {
	const url = `/api/issues/${id}`;
	const res = await fetch(url, { method: 'DELETE' });
	const json: IssueDeleteResponse = await res.json();
	if (!json.success) throw new Error(json.error ?? '이슈 삭제 실패');
	// 성공이면 아무것도 리턴하지 않음
}
