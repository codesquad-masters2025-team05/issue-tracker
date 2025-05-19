import { useUserList } from '@/entities/user/hooks/useUserList';
// src/entities/user/ui/AssigneeDropdown.tsx
import {
	CustomDropdownPanel,
	type DropdownOption,
} from '@/shared/ui/CustomDropdownPanel';
import { useMemo, useState } from 'react';

export default function AssigneeDropdown() {
	const [selected, setSelected] = useState<string | null>(null);
	const { data, isLoading, error } = useUserList();

	const userOptions = useMemo<DropdownOption[]>(() => {
		const noneOption: DropdownOption = {
			id: 0,
			value: 'none',
			display: '담당자가 없는 이슈',
		};

		const fetchedOptions: DropdownOption[] =
			data?.users.map((user) => ({
				id: user.id,
				value: user.username,
				display: user.username,
				imageUrl: user.imageUrl,
			})) ?? [];

		return [noneOption, ...fetchedOptions];
	}, [data]);

	return (
		<div className='flex justify-center'>
			<CustomDropdownPanel
				label='담당자'
				panelLabel='담당자 필터'
				options={userOptions}
				value={selected}
				onChange={setSelected}
				isLoading={isLoading}
				error={!!error}
			/>
		</div>
	);
}
