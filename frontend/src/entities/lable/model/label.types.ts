// API 레이어가 반환하는 raw 타입
export interface LabelApiDto {
	id: number;
	name: string;
	description: string | null;
	backgroundColor: string;
	textColor: string;
}

// API wrapper 전체 응답
export interface LabelsResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		labels: LabelApiDto[];
	};
	error: string | null;
}

// 프론트엔드에서 사용할 Label 타입
export interface Label {
	id: number;
	name: string;
	description?: string | null;
	backgroundColor: string;
	textColor: string;
}
