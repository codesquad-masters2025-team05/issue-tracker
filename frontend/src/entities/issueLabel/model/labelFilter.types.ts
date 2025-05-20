// API에서 내려주는 레이블 option raw 타입
export interface IssueLabelOptionApiDto {
	id: number;
	name: string;
	backgroundColor: string;
	textColor: string;
}

// API 전체 응답 타입
export interface IssueLabelOptionsResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		labels: IssueLabelOptionApiDto[];
	};
	error: string | null;
}

// FE에서 사용하는 option 타입 (단순 alias)
export interface IssueLabelOption {
	id: number;
	name: string;
	backgroundColor: string;
	textColor: string;
}
