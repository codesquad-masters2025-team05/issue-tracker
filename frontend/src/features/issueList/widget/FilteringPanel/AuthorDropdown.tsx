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

	const userOptions = useMemo<DropdownOption[]>(() => {
		const noneOption: DropdownOption = {
			id: 0,
			value: 'none',
			display: '작성자가 없는 이슈',
		};

		const fetchedOptions: DropdownOption[] =
			data?.users.map((author) => ({
				id: author.id,
				value: author.username,
				display: author.username,
				imageUrl: author.imageUrl,
			})) ?? [];

		return [noneOption, ...fetchedOptions];
	}, [data]);

	return (
		<div className='flex justify-center'>
			<CustomDropdownPanel
				label='작성자'
				panelLabel='작성자 필터'
				options={userOptions}
				value={selected}
				onChange={setSelected}
				isLoading={isLoading}
				error={!!error}
			/>
		</div>
	);
}
