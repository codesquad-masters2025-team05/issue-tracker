export interface CommentAttachment {
	id: number;
	fileName: string;
	url: string;
}

export interface CommentCreateRequest {
	content: string;
}

export interface CommentUpdateRequest {
	content?: string;
}

export interface CommentResponse {
	success: boolean;
	data: null;
	error: string | null;
}
