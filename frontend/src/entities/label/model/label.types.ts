// API에서 내려오는 단일 Label
export interface LabelApiEntity {
	id: number;
	name: string;
	description: string;
	backgroundColor: string;
	textColor: string;
}

// API 응답의 data 부분만 타입으로 분리
export interface LabelListData {
	total: number;
	page: number;
	perPage: number;
	labels: LabelApiEntity[];
}

// API 응답 - Label 리스트 (페이징 포함)
export interface LabelListApiResponseDto {
	success: boolean;
	data: LabelListData;
	error: string | null;
}

// API 응답 - 단일 Label
export interface LabelApiResponseDto {
	success: boolean;
	data: LabelApiEntity;
	error: string | null;
}

// 생성 입력값 (id 제외)
export interface LabelCreatePayload {
	name: string;
	description: string;
	backgroundColor: string;
	textColor: string;
}

// 생성 응답값 (id)
export interface LabelCreateResponseDto {
	success: boolean;
	data: number;
	error: string | null;
}

// 수정 입력값 - 메서드는 put으로 전체 대체용
export interface LabelUpdatePayload {
	id: number;
	name: string;
	description: string;
	backgroundColor: string;
	textColor: string;
}

// 프론트엔드 도메인 모델 (설명, description은 optional로 처리)
export interface Label {
	id: number;
	name: string;
	description: string;
	backgroundColor: string;
	textColor: string;
}
