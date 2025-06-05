// 회원가입 요청
export interface RegisterRequest {
	username: string;
	email: string;
	imageUrl: string;
	password: string;
}

// 회원가입 응답
export interface RegisterResponse {
	success: boolean;
	data: string | null;
	error: {
		message: string;
		code: number;
	};
}

// 로그인 요청
export interface LoginRequest {
	email: string;
	password: string;
}

// 로그인 응답
export interface LoginResponse {
	success: boolean;
	data: {
		accessToken: string;
	};
	error: {
		message: string;
		code: number;
	};
}
