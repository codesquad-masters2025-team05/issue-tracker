async function realGetJSON<T>(path: string): Promise<T> {
	const res = await fetch(`${path}`, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
	}
	return res.json();
}

/**
 * 주어진 경로(path)에 GET 요청을 보내고, JSON 응답을 파싱하여 반환합니다.
 *
 * @template T - 반환될 JSON 데이터의 타입을 지정합니다.
 * @param path - API 엔드포인트 경로 (예: "/api/issues").
 * @returns 파싱된 JSON 데이터(T 타입)의 Promise.
 *
 * @throws Error if HTTP 상태 코드가 200~299 범위가 아닐 경우 Error를 던집니다.
 *
 * 실제 통신 또는 mock 중 하나를 자동으로 선택하여 사용합니다.
 */
export const getJSON = realGetJSON;
