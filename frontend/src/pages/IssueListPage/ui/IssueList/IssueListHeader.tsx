import { Dropdown } from '@/shared/ui/Dropdown';
import { Button } from '@/shared/ui/button';
import type { FC } from 'react';
import { useISsueFilterOptions } from '../../hooks/useIssueFilterOptions';
import type { IssueListFilterState as IssueListHeaderProps } from '../../model/types';
import { Checkbox } from './CheckBox';

export const IssueListHeader: FC<IssueListHeaderProps> = ({
	isOpen,
	setIsOpen,
	stateId,
	setStateId,
	assigneeId,
	setAssigneeId,
	labelIds,
	setLabelIds,
	milestoneId,
	setMilestoneId,
	authorId,
	setAuthorId,
}) => {
	const {
		labelOptions,
		milestoneOptions,
		userOptions,
		authorOptions,
		labelLoading,
		milestoneLoading,
		userLoading,
		authorLoading,
		labelError,
		milestoneError,
		userError,
		authorError,
	} = useISsueFilterOptions();

	const isOpenActive = stateId === 0 ? true : stateId === 4 ? false : isOpen;

	return (
		<div className='w-full h-[64px] flex items-center justify-between px-8'>
			<div>
				<Checkbox className='mr-4' />
				<Button
					variant='ghost'
					onClick={() => setIsOpen(true)}
					size='md'
					className={`w-[102px] h-8 ${isOpenActive && 'font-selected-bold-16'}`}
				>
					열린 이슈
				</Button>
				<Button
					variant='ghost'
					onClick={() => setIsOpen(false)}
					size='md'
					className={`w-[102px] h-8 ${!isOpenActive && 'font-selected-bold-16'}`}
				>
					닫힌 이슈
				</Button>
			</div>
			<div className='flex gap-3'>
				<Dropdown
					label='담당자'
					panelLabel='담당자 필터'
					options={userOptions}
					selectedOptions={assigneeId}
					onChange={setAssigneeId}
					isLoading={userLoading}
					error={userError}
				/>
				<Dropdown
					label='레이블'
					panelLabel='레이블 필터'
					options={labelOptions}
					selectedOptions={labelIds}
					onChange={setLabelIds}
					isLoading={labelLoading}
					error={labelError}
				/>
				<Dropdown
					label='마일스톤'
					panelLabel='마일스톤 필터'
					options={milestoneOptions}
					selectedOptions={milestoneId}
					onChange={setMilestoneId}
					isLoading={milestoneLoading}
					error={milestoneError}
					isAlignRight={true}
				/>
				<Dropdown
					label='작성자'
					panelLabel='작성자 필터'
					options={authorOptions}
					selectedOptions={authorId}
					onChange={setAuthorId}
					isLoading={authorLoading}
					error={authorError}
					isAlignRight={true}
				/>
			</div>
		</div>
	);
};
