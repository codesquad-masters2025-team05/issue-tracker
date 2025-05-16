// src/entities/user/ui/AuthorDropdown.tsx
import { useAuthorList } from '@/entities/user/hooks/useAuthorList';
import {
	CustomDropdownPanel,
	type DropdownOption,
} from '@/shared/ui/CustomDropdownPanel';
import { useMemo, useState } from 'react';

export default function AuthorDropdown() {
	const [selected, setSelected] = useState<string | null>(null);
	const { data, isLoading, error } = useAuthorList();

	// 항상 최상단에서 useMemo 호출
	const userOptions = useMemo<DropdownOption[]>(() => {
		const noneOption: DropdownOption = {
			id: 0,
			value: 'none',
			display: '작성자가 없는 이슈',
		};

		const fetchedOptions: DropdownOption[] =
			data?.authors.map((author) => ({
				id: author.id,
				value: author.username,
				display: author.username,
				imageUrl: author.imageUrl,
			})) ?? [];

		return [noneOption, ...fetchedOptions];
	}, [data]);

	// 로딩 및 에러 상태 처리
	if (isLoading) {
		return <div>작성자 목록 로딩 중…</div>;
	}
	if (error) {
		return (
			<div className='text-destructive'>
				작성자 목록을 불러오는 중 에러가 발생했습니다.
			</div>
		);
	}

	return (
		<div className='flex justify-center'>
			<CustomDropdownPanel
				label='작성자'
				panelLabel='작성자 필터'
				options={userOptions}
				value={selected}
				onChange={setSelected}
			/>
		</div>
	);
}
