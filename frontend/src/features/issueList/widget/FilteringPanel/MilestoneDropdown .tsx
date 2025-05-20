import { useMilestoneList } from '@/entities/milestone/hooks/useMilestoneList';
import {
	CustomDropdownPanel,
	type DropdownOption,
} from '@/shared/ui/CustomDropdownPanel';
import { useMemo, useState } from 'react';

export default function MilestoneDropdown() {
	const [selected, setSelected] = useState<string | null>(null);
	const { data, isLoading, error } = useMilestoneList();

	const milestoneOptions = useMemo<DropdownOption[]>(() => {
		const noneOption: DropdownOption = {
			id: 0,
			value: 'none',
			display: '마일스톤이 없는 이슈',
		};

		const fetchedOptions: DropdownOption[] =
			data?.milestones.map((milestone) => ({
				id: milestone.id,
				value: milestone.name,
				display: milestone.name,
			})) ?? [];

		return [noneOption, ...fetchedOptions];
	}, [data]);

	return (
		<div className='flex justify-center'>
			<CustomDropdownPanel
				label='마일스톤'
				panelLabel='마일스톤 필터'
				options={milestoneOptions}
				value={selected}
				onChange={setSelected}
				isLoading={isLoading}
				error={!!error}
			/>
		</div>
	);
}
