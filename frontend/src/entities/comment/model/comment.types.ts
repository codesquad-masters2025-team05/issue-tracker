export interface CommentAttachment {
	id: number;
	fileName: string;
	url: string;
}

export interface CommentCreateRequest {
	body: string;
	attachments: CommentAttachment[];
}

export interface CommentUpdateRequest {
	body?: string;
	attachments?: CommentAttachment[];
}

export interface CommentResponse {
	success: boolean;
	data: null;
	error: string | null;
}
