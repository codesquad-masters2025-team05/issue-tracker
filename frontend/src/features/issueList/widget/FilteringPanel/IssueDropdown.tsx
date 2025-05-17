import { CustomDropdownPanel } from '@/shared/ui/CustomDropdownPanel';
import { useState } from 'react';

const issueFilteringList = [
	{
		id: 0,
		value: 'open',
		display: '열린 이슈',
	},
	{
		id: 1,
		value: 'my',
		display: '내가 작성한 이슈',
	},
	{
		id: 2,
		value: 'assigned',
		display: '나에게 할당된 이슈',
	},
	{
		id: 3,
		value: 'commented',
		display: '내가 댓글을 남긴 이슈',
	},
	{
		id: 4,
		value: 'closed',
		display: '닫힌 이슈',
	},
];

export default function IssueDropdown({ className = '' }) {
	const [selected, setSelected] = useState<string | null>('open');

	return (
		<CustomDropdownPanel
			label='필터'
			panelLabel='이슈 필터'
			options={issueFilteringList}
			value={selected}
			onChange={setSelected}
			className={className}
		/>
	);
}
