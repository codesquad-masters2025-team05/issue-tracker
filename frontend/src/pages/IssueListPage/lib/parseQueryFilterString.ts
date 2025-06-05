/**
 * 쿼리스트링에서 q 파라미터를 파싱하여
 * + → ' ' (공백)으로 바꾸고, 디코드된 문자열을 반환합니다.
 *
 * @param search (예: "?q=is%3Aopen%2Blabel%3Abug%2Blabel%3Afeature")
 * @returns (예: "is:open label:bug label:feature")
 */
export function parseQueryFilterString(search: string): string {
	const params = new URLSearchParams(search);
	const rawQ = params.get('q') ?? '';
	// decodeURIComponent: %3A, %2B 같은 인코딩 해석
	// +는 decodeURIComponent에서 ' ' (공백)으로 변환되지 않으므로 직접 처리
	const decoded = decodeURIComponent(rawQ);
	return decoded.replace(/\+/g, ' ');
}
