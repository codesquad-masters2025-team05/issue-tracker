// src/shared/utils/getRandomColor.ts

/**
 * 라벨에 어울리는 랜덤 HEX 컬러 생성 (너무 밝거나 어두운 색 배제)
 */
export function getRandomHexColor(): string {
	// 적당히 선명하고 명도 적절한 범위에서 생성
	const hue = Math.floor(Math.random() * 360); // 0~359
	const saturation = Math.floor(Math.random() * 40) + 60; // 60~99%
	const lightness = Math.floor(Math.random() * 45) + 30; // 30~74%
	return hslToHex(hue, saturation, lightness);
}

/**
 * HSL → HEX 변환
 */
function hslToHex(h: number, s: number, l: number): string {
	const sDecimal = s / 100;
	const lDecimal = l / 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = sDecimal * Math.min(lDecimal, 1 - lDecimal);
	const f = (n: number) =>
		lDecimal - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
	const r = Math.round(255 * f(0));
	const g = Math.round(255 * f(8));
	const b = Math.round(255 * f(4));
	return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}
