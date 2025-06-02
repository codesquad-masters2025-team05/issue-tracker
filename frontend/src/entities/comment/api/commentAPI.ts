import type {
	CommentCreateRequest,
	CommentResponse,
	CommentUpdateRequest,
} from '../model/comment.types';

export async function createComment(
	issueId: number,
	payload: CommentCreateRequest,
): Promise<CommentResponse> {
	const url = `/api/issues/${issueId}/comments`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res.json();
}

export async function updateComment(
	commentId: number,
	payload: CommentUpdateRequest,
) {
	const url = `/api/comments/${commentId}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	if (res.status === 204) return;
	throw new Error('코멘트 수정 실패');
}

export async function deleteComment(commentId: number) {
	const url = `/api/comments/${commentId}`;
	const res = await fetch(url, {
		method: 'DELETE',
	});
	if (res.status === 204) return;
	throw new Error('코멘트 삭제 실패');
}
