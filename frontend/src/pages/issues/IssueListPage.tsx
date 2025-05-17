import SearchIcon from '@/assets/search.svg?react';
import { useIssueList } from '@/entities/issue/hooks/useIssueList';
import { IssueList } from '@/features/issueList';
import {
	IssueCreationButton,
	LabelListButton,
	MilestoneListButton,
} from '@/features/issueList/widget';
import IssueDropdown from '@/features/issueList/widget/FilteringPanel/IssueDropdown';
import { Spinner } from '@/shared/ui/spinner';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const IssueListPage: FC = () => {
	const { data, isLoading, error } = useIssueList();

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-full'>
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center text-red-600'>
				이슈를 불러오는 중 오류가 발생했습니다.
			</div>
		);
	}

	return (
		<>
			<Outlet />
			<div className='flex items-center gap-4 mt-8 mb-6 justify-between'>
				<div className='w-140 flex border border-[var(--neutral-border-default)] rounded-2xl'>
					<IssueDropdown className='w-32 h-10' />
					<div className='border-r border-[var(--neutral-border-default)]' />
					<div className='w-full flex items-center gap-1 px-6 bg-[var(--neutral-surface-bold)] rounded-r-2xl'>
						<SearchIcon />
						<input value='is:issue is:open' className='' />
					</div>
				</div>

				<div className='flex gap-4'>
					<div className='flex border border-[var(--neutral-border-default)] rounded-2xl'>
						<LabelListButton />
						<div className='border-r border-[var(--neutral-border-default)]' />
						<MilestoneListButton />
					</div>
					<IssueCreationButton />
				</div>
			</div>
			{data && <IssueList issues={data.issues} />}
		</>
	);
};

export default IssueListPage;
