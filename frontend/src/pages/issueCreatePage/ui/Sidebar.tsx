import { Dropdown } from '@/shared/ui/Dropdown';
import type { FC } from 'react';
import { useIssueCreateOptions } from '../hooks/useIssueCreateOptions';

interface SidebarProps {
	assigneeIds: number[];
	setAssigneeIds: (ids: number[]) => void;
	labelIds: number[];
	setLabelIds: (ids: number[]) => void;
	milestoneId: number | null;
	setMilestoneId: (id: number | null) => void;
}

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const Area: FC<{ children?: React.ReactNode }> = ({ children }) => (
	<div className='flex flex-col gap-8 py-8 px-4'>{children}</div>
);

export const Sidebar: FC<SidebarProps> = ({
	assigneeIds,
	setAssigneeIds,
	labelIds,
	setLabelIds,
	milestoneId,
	setMilestoneId,
}) => {
	const {
		labelOptions,
		milestoneOptions,
		userOptions,
		labelLoading,
		milestoneLoading,
		userLoading,
		labelError,
		milestoneError,
		userError,
	} = useIssueCreateOptions();

	return (
		<div className='flex flex-col h-fit border border-[var(--neutral-border-default)] rounded-2xl bg-[var(--neutral-surface-strong)]'>
			<Area>
				<Dropdown
					label='담당자'
					panelLabel='담당자 설정'
					options={userOptions}
					selectedOptions={assigneeIds}
					onChange={setAssigneeIds}
					className='w-[256px]'
					isAlignRight={true}
				/>
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='레이블'
					panelLabel='레이블 설정'
					options={labelOptions}
					selectedOptions={labelIds}
					onChange={setLabelIds}
					isAlignRight={true}
				/>
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='마일스톤'
					panelLabel='마일스톤 설정'
					options={milestoneOptions}
					selectedOptions={milestoneId}
					onChange={setMilestoneId}
					isAlignRight={true}
				/>
			</Area>
		</div>
	);
};
