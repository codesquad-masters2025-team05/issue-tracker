// src/shared/utils/labelValidation.ts
import { LABEL_TEXT_COLORS, type LabelTextColor } from './labelTextColors';

export interface LabelFormValues {
	name: string;
	description?: string;
	backgroundColor: string;
	textColor: LabelTextColor | ''; // '' 허용(미선택 상태) or strict하게 LabelTextColor만
}

export function validateLabelForm(values: LabelFormValues): string | null {
	const { name, backgroundColor, textColor } = values;
	if (!name || name.length < 1) {
		return '이름은 1글자 이상이어야 합니다.';
	}
	if (name.length > 20) {
		return '이름은 20글자 미만이어야 합니다.';
	}
	if (!/^#[0-9A-Fa-f]{6}$/.test(backgroundColor)) {
		return '배경색은 #RRGGBB 형식의 16진수 색상(숫자 0~9, 영문 A~F 조합)만 입력 가능합니다. 예: #1A2B3C';
	}
	if (!LABEL_TEXT_COLORS.some((opt) => opt.value === textColor)) {
		return '글자 색을 선택해 주세요.';
	}
	return null;
}
