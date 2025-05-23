import { Dropdown } from '@/shared/ui/Dropdown_v2';
import type { DropdownOption } from '@/shared/ui/Dropdown_v2/DropdownOption';

const filterDropdownOptions: DropdownOption[] = [
	{ id: 0, display: '열린 이슈', key: 'is', value: 'open' },
	{ id: 1, display: '내가 작성한 이슈', key: 'assginee', value: '@me' },
	{ id: 2, display: '나에게 할당된 이슈', key: 'author', value: '@me' },
	{
		id: 3,
		display: '내가 댓글을 남긴 이슈',
		key: 'commented',
		value: '@me',
	},
	{ id: 4, display: '닫힌 이슈', key: 'is', value: 'closed' },
];

interface IssueFilterDropdownProps {
	className?: string;
}
// ... existing code ...
export function IssueFilterDropdown({ className }: IssueFilterDropdownProps) {
	return (
		<Dropdown
			label='필터'
			panelLabel='이슈 필터'
			options={filterDropdownOptions}
			className={`w-24 hover:bg-[var(--neutral-surface-bold)] rounded-l-2xl ${className}`}
		/>
	);
}
