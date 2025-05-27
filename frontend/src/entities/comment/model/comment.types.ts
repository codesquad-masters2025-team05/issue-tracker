export interface CommentAttachment {
	id: number;
	fileName: string;
	url: string;
}

export interface CommentCreateRequest {
	content: string;
	attachments: CommentAttachment[];
}

export interface CommentUpdateRequest {
	content?: string;
	attachments?: CommentAttachment[];
}

export interface CommentResponse {
	success: boolean;
	data: null;
	error: string | null;
}
