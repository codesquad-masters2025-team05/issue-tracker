import { useIssueList } from '@/entities/issue/hooks/useIssueList';
import { Spinner } from '@/shared/ui/spinner';
import { NavigationButton } from '@/widgets/NavigationButton';
import type { FC } from 'react';
import { useISsueFilterOptions } from './hooks/useIssueFilterOptions';
import { makeIssueListQuery } from './lib/makeIssueListQuery';
import { useIssueListFilterState } from './model/useIssueListFilterState';
import { FilterBar } from './ui/FilterBar';
import { IssueCreationButton } from './ui/IssueCreationButton';
import { IssueList } from './ui/IssueList';

const IssueListPage: FC = () => {
	const { labelOptions, milestoneOptions, userOptions, authorOptions } =
		useISsueFilterOptions();
	const filterState = useIssueListFilterState();

	// 결과: "?q=is:open+label:bug+label:documentation+author:dorkem&page=1&perPage=10"
	const queryString = makeIssueListQuery({
		isOpen: filterState.isOpen,
		assigneeId: filterState.assigneeId,
		labelIds: filterState.labelIds,
		milestoneId: filterState.milestoneId,
		authorId: filterState.authorId,
		labelOptions,
		milestoneOptions,
		userOptions,
		authorOptions,
	});

	const { data, isLoading, error } = useIssueList(queryString);

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
			<div className='flex items-center gap-4 mt-8 mb-6 justify-between'>
				<FilterBar
					queryString={queryString}
					isOpen={filterState.isOpen}
					setIsOpen={filterState.setIsOpen}
					stateId={filterState.stateId}
					setStateId={filterState.setStateId}
				/>
				<div className='flex gap-4'>
					<NavigationButton />
					<IssueCreationButton />
				</div>
			</div>
			{data && <IssueList issues={data.issues} {...filterState} />}
		</>
	);
};

export default IssueListPage;
