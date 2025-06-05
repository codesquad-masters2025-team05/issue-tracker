import { useFetchIssueList } from '@/entities/issue/hooks/useFetchIssueList';
import { useFetchLabelCount } from '@/entities/label/hooks/useFetchLabelCount';
import { useFetchLabelList } from '@/entities/label/hooks/useFetchLabelList';
import { useFetchMilestoneCount } from '@/entities/milestone/hooks/useFetchMilestoneCount';
import { useFetchMilestoneList } from '@/entities/milestone/hooks/useFetchMilestoneList';
import { Pagination } from '@/shared/ui/Pagination';
import { NavigationButton } from '@/widgets/LabelMilestoneTabs';
import { useQ } from './hooks/useQueryString';
import { useIssueListFilterState } from './model/useIssueListFilterState';
import { FilterBar } from './ui/FilterBar';
import { IssueCreationButton } from './ui/IssueCreationButton';
import { IssueList } from './ui/IssueList';

const IssueListPage = () => {
	const filterState = useIssueListFilterState();
	const { getQ, getPage, setPage } = useQ();
	const q = getQ() || 'is:open';
	const page = getPage();

	useFetchLabelList();
	useFetchLabelCount();
	useFetchMilestoneList();
	useFetchMilestoneCount();

	const { data: IssueListData, error } = useFetchIssueList(q, page);

	const perPage = IssueListData?.perPage ?? 10;

	let totalCount = 0;
	if (IssueListData) {
		if (q.includes('is:open')) totalCount = IssueListData.openCount;
		else if (q.includes('is:closed')) totalCount = IssueListData.closedCount;
	}

	// 페이지 변경 핸들러
	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
	};

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
				<>
					<IssueList
						openCount={IssueListData.openCount}
						closedCount={IssueListData.closedCount}
						issues={IssueListData.issues}
						{...filterState}
					/>
					<Pagination
						totalCount={totalCount}
						page={page}
						perPage={perPage}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</>
	);
};

export default IssueListPage;
