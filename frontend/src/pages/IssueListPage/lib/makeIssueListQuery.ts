interface Option {
	id: number;
	display: string;
}

interface MakeQueryParamsArgs {
	isOpen: boolean;
	assigneeId: number | null;
	labelIds: number[];
	milestoneId: number | null;
	authorId: number | null;
	labelOptions: Option[];
	milestoneOptions: Option[];
	userOptions: Option[];
	authorOptions: Option[];
	page?: number;
	perPage?: number;
}

export function makeIssueListQuery({
	isOpen,
	assigneeId,
	labelIds,
	milestoneId,
	authorId,
	labelOptions,
	milestoneOptions,
	userOptions,
	authorOptions,
	page,
	perPage,
}: MakeQueryParamsArgs): string {
	const filters: string[] = [`is:${isOpen ? 'open' : 'closed'}`];

	for (const id of labelIds) {
		const opt = labelOptions.find((opt) => opt.id === id);
		if (opt) filters.push(`label:${opt.display}`);
	}

	if (assigneeId !== null) {
		const opt = userOptions.find((opt) => opt.id === assigneeId);
		if (opt) filters.push(`assignee:${opt.display}`);
	}

	if (milestoneId !== null) {
		const opt = milestoneOptions.find((opt) => opt.id === milestoneId);
		if (opt) filters.push(`milestone:${opt.display}`);
	}

	if (authorId !== null) {
		const opt = authorOptions.find((opt) => opt.id === authorId);
		if (opt) filters.push(`author:${opt.display}`);
	}

	// 여기서 q는 직접 문자열로 붙임
	let queryString = `?q=${filters.join('+')}`;
	if (page !== undefined) queryString += `&page=${page}`;
	if (perPage !== undefined) queryString += `&perPage=${perPage}`;

	return queryString;
}
