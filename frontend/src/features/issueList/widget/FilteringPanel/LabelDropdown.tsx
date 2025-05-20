import { useLabelList } from '@/entities/lable/hooks/useLabelList';
import {
	CustomDropdownPanel,
	type DropdownOption,
} from '@/shared/ui/CustomDropdownPanel';
import { useMemo, useState } from 'react';

export default function LabelDropdown() {
	const [selected, setSelected] = useState<string | null>(null);
	const { data, isLoading, error } = useLabelList();

	const labelOptions = useMemo<DropdownOption[]>(() => {
		const noneOption: DropdownOption = {
			id: 0,
			value: 'none',
			display: '레이블이 없는 이슈',
		};
		const fetchedOptions: DropdownOption[] =
			data?.labels.map((label) => ({
				id: label.id,
				value: label.name,
				display: label.name,
				color: label.backgroundColor,
				// 필요 시 색상 정보, description 등 추가 가능
			})) ?? [];

		return [noneOption, ...fetchedOptions];
	}, [data]);

	return (
		<div className='flex justify-center'>
			<CustomDropdownPanel
				label='레이블'
				panelLabel='레이블 필터'
				options={labelOptions}
				value={selected}
				onChange={setSelected}
				isLoading={isLoading}
				error={!!error}
			/>
		</div>
	);
}
