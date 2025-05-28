import { useFetchIssueList } from '@/entities/issue/hooks/useFetchIssueList';
import { NavigationButton } from '@/widgets/NavigationButton';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIssueListFilterState } from './model/useIssueListFilterState';
import { FilterBar } from './ui/FilterBar';
import { IssueCreationButton } from './ui/IssueCreationButton';
import { IssueList } from './ui/IssueList';

const IssueListPage: FC = () => {
	const filterState = useIssueListFilterState();

	const [searchParams] = useSearchParams();
	const q = searchParams.get('q') ?? 'is:open';
	const { data: IssueListData, isLoading, error } = useFetchIssueList(q);

	/* 추후 스켈레톤으로 변경 */
	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center items-center h-full'>
	// 			<Spinner />
	// 		</div>
	// 	);
	// }

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
				<FilterBar />
				<div className='flex gap-4'>
					<NavigationButton />
					<IssueCreationButton />
				</div>
			</div>
			{IssueListData && (
				<IssueList
					openCount={IssueListData.openCount}
					closedCount={IssueListData.closedCount}
					issues={IssueListData.issues}
					{...filterState}
				/>
			)}
		</>
	);
};

export default IssueListPage;
