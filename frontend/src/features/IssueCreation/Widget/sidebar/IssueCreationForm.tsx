import { useState } from 'react';
import type { DropdownOption } from './DropdownOption';
import { SidebarDropdown } from './SidebarDropdown';

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const Area: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<div className='flex flex-col gap-8 py-8 px-4'>{children}</div>
);

// 더미 데이터 정의
const userOptions: DropdownOption[] = [
	{
		id: 1,
		value: 'user1',
		display: '사용자 1',
		imageUrl: 'https://via.placeholder.com/150',
	},
	{
		id: 2,
		value: 'user2',
		display: '사용자 2',
		imageUrl: 'https://via.placeholder.com/150',
	},
	{
		id: 3,
		value: 'user3',
		display: '사용자 3',
		imageUrl: 'https://via.placeholder.com/150',
	},
];

const labelOptions: DropdownOption[] = [
	{ id: 1, value: 'bug', display: '버그', color: '#FF0000' },
	{ id: 2, value: 'feature', display: '기능 개선', color: '#00FF00' },
	{ id: 3, value: 'enhancement', display: '개선', color: '#0000FF' },
];

const milestoneOptions: DropdownOption[] = [
	{ id: 1, value: 'v1.0', display: '버전 1.0', progress: 50 },
	{ id: 2, value: 'v1.1', display: '버전 1.1', progress: 0 },
];

export function IssueCreationForm() {
	const [assignee, setAssignee] = useState<string | null>(null);
	const [label, setLabel] = useState<string | null>(null);
	const [milestone, setMilestone] = useState<string | null>(null);

	return (
		<div
			className='
			flex flex-col h-fit
			border border-[var(--neutral-border-default)] rounded-2xl 
			bg-[var(--neutral-surface-strong)]
			'
		>
			<Area>
				<SidebarDropdown
					label='담당자'
					panelLabel='담당자 설정'
					options={userOptions}
					value={assignee}
					onChange={setAssignee}
					className='w-[256px]'
				/>
			</Area>
			<Division />
			<Area>
				<SidebarDropdown
					label='레이블'
					panelLabel='레이블 설정'
					options={labelOptions}
					value={label}
					onChange={setLabel}
				/>
			</Area>
			<Division />
			<Area>
				<SidebarDropdown
					label='마일스톤'
					panelLabel='마일스톤 설정'
					options={milestoneOptions}
					value={milestone}
					onChange={setMilestone}
				/>
			</Area>
		</div>
	);
}
