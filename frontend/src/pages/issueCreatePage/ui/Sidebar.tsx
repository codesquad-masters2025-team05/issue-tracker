import { OptionAvatarLabel } from '@/shared/ui/AvatarLabel'; // 앞서 만든 공용 컴포넌트
import { Dropdown } from '@/shared/ui/Dropdown';
import { LabelChip } from '@/shared/ui/LabelChip';
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
	<div className='flex flex-col gap-4 py-8 px-4'>{children}</div>
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
		labelData,
		milestoneData,
		usersData,
	} = useIssueCreateOptions();

	// 1. 원본 데이터에서 id로 직접 찾기
	const selectedAssignees = assigneeIds
		.map((id) => usersData?.users.find((u) => u.id === id))
		.filter(Boolean); // undefined 제거

	const selectedLabels = labelIds
		.map((id) => labelData?.labels.find((l) => l.id === id))
		.filter(Boolean);

	const selectedMilestone = milestoneData?.milestones.find(
		(m) => m.id === milestoneId,
	);

	return (
		<div className='flex flex-col h-fit border border-[var(--neutral-border-default)] rounded-2xl bg-[var(--neutral-surface-strong)]'>
			<Area>
				<Dropdown
					label='담당자'
					panelLabel='담당자 설정'
					options={userOptions}
					selectedOptions={assigneeIds}
					onChange={setAssigneeIds}
					isLoading={userLoading}
					error={userError}
					className='w-[256px]'
					isAlignRight={true}
				/>
				{/* 선택된 담당자 목록 */}
				<div className='flex flex-col gap-4 px-4'>
					{selectedAssignees.map((opt) =>
						opt ? (
							<OptionAvatarLabel
								key={opt.id}
								imageUrl={opt.imageUrl}
								text={opt.username}
							/>
						) : null,
					)}
				</div>
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='레이블'
					panelLabel='레이블 설정'
					options={labelOptions}
					selectedOptions={labelIds}
					onChange={setLabelIds}
					isLoading={labelLoading}
					error={labelError}
					isAlignRight={true}
				/>
				{/* 선택된 레이블 목록 */}
				<div className='flex flex-col gap-4 px-4'>
					{selectedLabels.map((rawLabel) =>
						rawLabel ? (
							<LabelChip
								key={rawLabel.id}
								id={rawLabel.id}
								name={rawLabel.name}
								backgroundColor={rawLabel.backgroundColor}
								textColor={rawLabel.textColor}
							/>
						) : null,
					)}
				</div>
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='마일스톤'
					panelLabel='마일스톤 설정'
					options={milestoneOptions}
					selectedOptions={milestoneId}
					onChange={setMilestoneId}
					isLoading={milestoneLoading}
					error={milestoneError}
					isAlignRight={true}
				/>
				{/* 선택된 마일스톤 */}
				{selectedMilestone && (
					<span className='inline-block mx-2 px-4 py-1 rounded-full bg-[var(--neutral-surface-bold)]'>
						{selectedMilestone.name}
					</span>
				)}
			</Area>
		</div>
	);
};
