// 이슈 생성 요청 타입 (POST /issues)
export interface IssueCreateRequest {
	title: string;
	comment: {
		content: string;
	};
	assigneeIds: number[];
	labelIds: number[];
	milestoneId: number | null;
}

// 이슈 생성 응답 타입 (POST /issues 응답)
export interface IssueCreateResponse {
	success: boolean;
	data: number; // 생성된 이슈의 id
	error: {
		message: string;
		code: number;
	} | null;
}
