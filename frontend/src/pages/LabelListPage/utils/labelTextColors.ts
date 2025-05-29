// src/shared/utils/labelTextColors.ts

export const LABEL_TEXT_COLORS = [
	{ value: 'white', label: '화이트', code: '#FFFFFF' },
	{ value: 'black', label: '블랙', code: '#14142B' },
	{ value: 'gray', label: '그레이', code: '#6E7191' },
	{ value: 'blue', label: '블루', code: '#007AFF' },
	{ value: 'red', label: '레드', code: '#FF3B30' },
] as const;

export type LabelTextColor = (typeof LABEL_TEXT_COLORS)[number]['value'];
