import { useMilestoneListPage } from '@/entities/milestone/hooks/useMilestoneListPage';

const MilestoneListPage: React.FC = () => {
	const { data, isLoading, error } = useMilestoneListPage();

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>에러 발생: {error.message}</div>;
	if (!data) return <div>데이터가 없습니다.</div>;

	return (
		<div className='p-4'>
			<h1 className='font-display-bold-20 mb-4'>마일스톤 목록</h1>
			<div className='mb-4 text-sm text-muted-foreground'>
				전체: {data.total} | 오픈: {data.openCount} | 닫힘: {data.closedCount}
			</div>
			<ul className='space-y-4'>
				{data.milestones.map((milestone) => (
					<li key={milestone.id} className='border rounded-lg p-4 shadow-sm'>
						<div className='flex items-center gap-2'>
							<span className='font-bold'>{milestone.name}</span>
							<span
								className={`text-xs px-2 py-0.5 rounded ${
									milestone.state === 'open'
										? 'bg-green-100 text-green-700'
										: 'bg-gray-200 text-gray-500'
								}`}
							>
								{milestone.state === 'open' ? '진행중' : '완료'}
							</span>
						</div>
						{milestone.description && (
							<div className='text-sm mt-1 text-muted-foreground'>
								{milestone.description}
							</div>
						)}
						<div className='mt-2 flex items-center gap-4 text-xs'>
							<span>
								마감일:{' '}
								{milestone.deadline ? (
									<span>{milestone.deadline}</span>
								) : (
									<span className='text-gray-400'>없음</span>
								)}
							</span>
							<span>
								이슈: <b>{milestone.openIssueCount}</b> 오픈 /{' '}
								<b>{milestone.closedIssueCount}</b> 닫힘
							</span>
							<span>진행률: {milestone.progress}%</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MilestoneListPage;
