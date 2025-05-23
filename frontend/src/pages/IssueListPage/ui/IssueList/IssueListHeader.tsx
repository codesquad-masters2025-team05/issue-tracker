import AlertCircleIcon from '@/assets/alertCircle.svg?react';
import ArchiveIcon from '@/assets/archive.svg?react';
import { Dropdown } from '@/shared/ui/Dropdown_v2';
import { Button } from '@/shared/ui/button';
import type { FC } from 'react';
import { useISsueFilterOptions } from '../../hooks/useIssueFilterOptions';
import { hasKeyValue, useQ } from '../../hooks/useQueryString';
import type { IssueListFilterState as IssueListHeaderProps } from '../../model/types';
import { Checkbox } from './CheckBox';

export const IssueListHeader: FC<IssueListHeaderProps> = () => {
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

	const { getQ, updateQ } = useQ();
	const isOpen = hasKeyValue(getQ(), 'is', 'open');
	const buttonClassName =
		'flex items-center gap-1 px-4 h-10 rounded-2xl transiton hover:bg-[var(--neutral-surface-bold)]';
	const defaultFontColor =
		'font-available-medium-16 text-[var(--neutral-text-default)]';
	const selectedFontColor =
		'font-selected-bold-16 text-[var(--neutral-text-strong)]';
	return (
		<div className='w-full h-[64px] flex items-center justify-between px-8'>
			<div className='flex items-center'>
				<Checkbox className='mr-4' />
				<button
					type='button'
					className={`${buttonClassName} ${isOpen ? selectedFontColor : defaultFontColor}`}
					onClick={() => updateQ('is', 'open')}
				>
					<AlertCircleIcon />
					<span>{`열린 이슈(${0})`}</span>
				</button>
				<button
					type='button'
					className={`${buttonClassName} ${!isOpen ? selectedFontColor : defaultFontColor}`}
					onClick={() => updateQ('is', 'closed')}
				>
					<ArchiveIcon />
					<span>{`닫힌 이슈(${0})`}</span>
				</button>
			</div>
			<div className='flex gap-3'>
				<Dropdown
					label='담당자'
					panelLabel='담당자 필터'
					options={userOptions}
					categoryKey='assignee'
					isLoading={userLoading}
					error={userError}
				/>
				<Dropdown
					label='레이블'
					panelLabel='레이블 필터'
					options={labelOptions}
					categoryKey='label'
					isLoading={labelLoading}
					error={labelError}
				/>
				<Dropdown
					label='마일스톤'
					panelLabel='마일스톤 필터'
					options={milestoneOptions}
					categoryKey='milestone'
					isLoading={milestoneLoading}
					error={milestoneError}
					isAlignRight={true}
				/>
				<Dropdown
					label='작성자'
					panelLabel='작성자 필터'
					options={authorOptions}
					categoryKey='author'
					isLoading={authorLoading}
					error={authorError}
					isAlignRight={true}
				/>
			</div>
		</div>
	);
};
