import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { OptionAvatarLabel } from '@/shared/ui/AvatarLabel';
import { Dropdown } from '@/shared/ui/Dropdown_v3';
import type { DropdownOption } from '@/shared/ui/Dropdown_v3/DropdownOption';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MilestoneBox } from './MilestoneBox';
import { useIssueInitialIds } from './useIssueInitialIds';
import { useIssueSelectOptions } from './useIssueSelectOptions';

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const Area: FC<{ children?: React.ReactNode }> = ({ children }) => (
	<div className='flex flex-col gap-4 py-8 px-4'>{children}</div>
);

export const Sidebar = () => {
	const {
		labelData,
		milestoneData,
		usersData,

		labelLoading,
		milestoneLoading,
		userLoading,

		labelError,
		milestoneError,
		userError,
	} = useIssueSelectOptions();

	const { id } = useParams<{ id: string }>();
	// data는 Ids, Id의 초기값 설정에만 사용함
	const { data } = useFetchIssueDetail(Number(id));
	const {
		labelIds,
		setLabelIds,
		assigneeIds,
		setAssigneeIds,
		milestoneId,
		setMilestoneId,
	} = useIssueInitialIds(data);

	const selectedAssignees = assigneeIds
		.map((id) => usersData?.users.find((u) => u.id === id))
		.filter(Boolean); // undefined 제거

	const selectedLabels = labelIds
		.map((id) => labelData?.labels.find((l) => l.id === id))
		.filter(Boolean);

	const selectedMilestone = milestoneData?.milestones.find(
		(m) => m.id === milestoneId,
	);

	const userOptions: DropdownOption[] = (usersData?.users ?? []).map(
		(user) => ({
			id: user.id,
			display: user.username,
			avatar: (
				<Avatar className='size-5'>
					<AvatarImage src={user.imageUrl} alt={user.username} />
					<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
				</Avatar>
			),
			isSelected: assigneeIds.includes(user.id),
			onClick: () => {
				if (assigneeIds.includes(user.id)) {
					setAssigneeIds(assigneeIds.filter((id) => id !== user.id));
				} else {
					setAssigneeIds([...assigneeIds, user.id]);
				}
			},
		}),
	);

	const labelOptions: DropdownOption[] = (labelData?.labels ?? []).map(
		(label) => ({
			id: label.id,
			display: label.name,
			avatar: (
				<span
					className='inline-block w-5 h-5 rounded-full'
					style={{ backgroundColor: label.backgroundColor }}
				/>
			),
			isSelected: labelIds.includes(label.id),
			onClick: () => {
				if (labelIds.includes(label.id)) {
					setLabelIds(labelIds.filter((id) => id !== label.id));
				} else {
					setLabelIds([...labelIds, label.id]);
				}
			},
		}),
	);

	const milestoneOptions: DropdownOption[] = (
		milestoneData?.milestones ?? []
	).map((ms) => ({
		id: ms.id,
		display: ms.name,
		isSelected: milestoneId === ms.id,
		onClick: () => {
			setMilestoneId(milestoneId === ms.id ? null : ms.id);
		},
		// 마일스톤은 avatar 없음
	}));

	return (
		<div className='flex flex-col h-fit border border-[var(--neutral-border-default)] rounded-2xl bg-[var(--neutral-surface-strong)]'>
			<Area>
				<Dropdown
					label='담당자'
					panelLabel='담당자 설정'
					options={userOptions}
					isLoading={userLoading}
					error={userError}
					isAlignRight={true}
					className='w-[254px]'
				/>

				{/* 선택된 담당자 목록 */}
				{selectedAssignees.length > 0 && (
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
				)}
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='레이블'
					panelLabel='레이블 설정'
					options={labelOptions}
					isLoading={labelLoading}
					error={labelError}
					isAlignRight={true}
				/>

				{/* 선택된 레이블 목록 */}
				{selectedLabels.length > 0 && (
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
				)}
			</Area>
			<Division />
			<Area>
				<Dropdown
					label='마일스톤'
					panelLabel='마일스톤 설정'
					options={milestoneOptions}
					isLoading={milestoneLoading}
					error={milestoneError}
					isAlignRight={true}
				/>
				{/* 선택된 마일스톤 */}
				{selectedMilestone != null && (
					<MilestoneBox milestone={selectedMilestone} />
				)}
			</Area>
		</div>
	);
};
