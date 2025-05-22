/**
 * q 문자열에서 key-value 쌍을 추가/삭제/수정한다.
 * @param q 기존 쿼리 문자열
 * @param key 키 이름 ('is', 'label', 'assignee', 'author', 'milestone' 등)
 * @param value 값 (@me 포함)
 * @returns 수정된 쿼리 문자열
 */
export function updateQueryString(
	q: string,
	key: string,
	value: string,
): string {
	// 파싱: 쌍따옴표 지원
	const regex = /(\w+):(?:"([^"]+)"|([^\s"]+))/g;
	const items: { key: string; value: string; raw: string }[] = [];
	let match: RegExpExecArray | null;
	while (true) {
		match = regex.exec(q);
		if (!match) break;
		items.push({
			key: match[1],
			value: match[2] ?? match[3],
			raw: match[0],
		});
	}

	// value에 공백 있으면 쌍따옴표
	const valueWithQuote = /\s/.test(value) ? `"${value}"` : value;

	if (key === 'is') {
		// is: 로 시작하는 거 모두 제거
		const filtered = items.filter((item) => item.key !== 'is');
		// 맨 앞에 is:value 추가
		return [`is:${valueWithQuote}`, ...filtered.map((i) => i.raw)]
			.join(' ')
			.trim();
	}

	if (value === '@me') {
		// key: 로 시작하는 거 모두 제거
		const filtered = items.filter((item) => item.key !== key);
		// 맨 뒤에 key:@me 추가
		return [...filtered.map((i) => i.raw), `${key}:@me`].join(' ').trim();
	}

	if (key === 'label') {
		// label:value와 일치하는 거 있는지
		const valueMatch = items.find(
			(item) => item.key === 'label' && item.value === value,
		);
		if (valueMatch) {
			// 있다면 제거
			return items
				.filter((item) => !(item.key === 'label' && item.value === value))
				.map((i) => i.raw)
				.join(' ')
				.trim();
		}
		return [...items.map((i) => i.raw), `label:${valueWithQuote}`]
			.join(' ')
			.trim();
	}

	// assignee, milestone, author
	if (['assignee', 'milestone', 'author'].includes(key)) {
		const valueMatch = items.find(
			(item) => item.key === key && item.value === value,
		);
		if (valueMatch) {
			return items
				.filter((item) => !(item.key === key && item.value === value))
				.map((i) => i.raw)
				.join(' ')
				.trim();
		}
		const filtered = items.filter((item) => item.key !== key);
		return [...filtered.map((i) => i.raw), `${key}:${valueWithQuote}`]
			.join(' ')
			.trim();
	}

	// 기타: 아무 동작도 안 함
	return q.trim();
}

import { useSearchParams } from 'react-router-dom';

/**
 * useQ - 쿼리 문자열 q 파라미터의 get/set을 위한 커스텀 훅
 *
 * @returns
 *   getQ: () => string (없으면 "is:open" 반환)
 *   setQ: (newQ: string) => void
 */
export function useQ() {
	const [searchParams, setSearchParams] = useSearchParams();

	// q 값 추출 (없으면 "is:open" 반환)
	const getQ = () => {
		const q = searchParams.get('q');
		return q?.trim() ? q : 'is:open';
	};

	// q 값만 변경 (다른 파라미터 보존)
	const setQ = (newQ: string) => {
		const next = new URLSearchParams(searchParams);
		if (newQ?.trim()) {
			next.set('q', newQ);
		} else {
			next.delete('q');
		}
		setSearchParams(next, { replace: true }); // history 쌓지 않고 대체
	};

	const updateQ = (key: string, value: string) => {
		const currentQ = getQ();
		const nextQ = updateQueryString(currentQ, key, value);
		setQ(nextQ);
	};

	return { getQ, setQ, updateQ };
}

// 띄어쓰기가 있으면 쌍따옴표로 감싸기
function formatValue(value: string) {
	return /\s/.test(value) ? `"${value}"` : value;
}

// q에 key:value가 포함되는지 체크
export function hasKeyValue(q: string, key: string, value: string) {
	const formattedValue = formatValue(value);
	const pattern = new RegExp(`\\b${key}:${escapeRegExp(formattedValue)}\\b`);
	return pattern.test(q);
}

// 정규식 특수문자 이스케이프 (값에 :나 + 등이 들어올 경우 대비)
function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
