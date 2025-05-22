import { Dropdown } from '@/shared/ui/Dropdown';

const issueFilteringList = [
	{
		id: 0,
		display: '열린 이슈',
	},
	{
		id: 1,
		display: '내가 작성한 이슈',
	},
	{
		id: 2,
		display: '나에게 할당된 이슈',
	},
	{
		id: 3,
		display: '내가 댓글을 남긴 이슈',
	},
	{
		id: 4,
		display: '닫힌 이슈',
	},
];

const map = {
	0: 'open',
	1: 'my',
	2: 'assigned',
	3: 'commented',
	4: 'closed',
};

interface IssueDropdownProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	stateId: number | null;
	setStateId: (Id: number | null) => void;
	className?: string;
}

export default function IssueDropdown({
	isOpen,
	setIsOpen,
	stateId,
	setStateId,
	className = '',
}: IssueDropdownProps) {
	return (
		<Dropdown
			label='필터'
			panelLabel='이슈 필터'
			options={issueFilteringList}
			selectedOptions={stateId}
			onChange={setStateId}
			className={className}
		/>
	);
}
