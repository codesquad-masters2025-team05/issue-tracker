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
): Promise<CommentResponse> {
	const url = `/api/comments/${commentId}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res.json();
}

export async function deleteComment(
	commentId: number,
): Promise<CommentResponse> {
	const url = `/api/comments/${commentId}`;
	const res = await fetch(url, {
		method: 'DELETE',
	});
	return res.json();
}
