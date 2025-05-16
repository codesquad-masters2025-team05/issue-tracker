// API 레이어가 반환하는 raw 타입
export interface AuthorApiDto {
	id: number;
	username: string;
	imageUrl: string;
}

// API wrapper 전체 응답
export interface AuthorsResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		authors: AuthorApiDto[];
	};
	error: string | null;
}

// 프론트엔드에서 사용할 Author 타입
export interface Author {
	id: number;
	username: string;
	avatarUrl: string; // DTO의 imageUrl을 매핑
}
