import { useLabelList } from '@/entities/label/hooks/useLabelList';

const LabelListPage: React.FC = () => {
	const { data, isLoading, error } = useLabelList();

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>에러 발생: {error.message}</div>;
	if (!data) return <div>데이터가 없습니다.</div>;

	return (
		<div className='p-4'>
			<h1 className='font-display-bold-20 mb-4'>라벨 목록</h1>
			<ul className='space-y-4'>
				{data.labels.map((label) => (
					<li
						key={label.id}
						className='flex items-center gap-4 border rounded-lg p-3 shadow-sm'
					>
						<span
							className='inline-block w-5 h-5 rounded'
							style={{ backgroundColor: label.backgroundColor }}
							title={label.backgroundColor}
						/>
						<span className='font-bold'>{label.name}</span>
						<span
							className='text-xs px-2 py-0.5 rounded'
							style={{
								backgroundColor: label.backgroundColor,
								color: label.textColor,
							}}
						>
							{label.name}
						</span>
						{label.description && (
							<span className='text-muted-foreground ml-3 text-sm'>
								{label.description}
							</span>
						)}
					</li>
				))}
			</ul>
			<div className='mt-6 text-xs text-gray-400'>
				전체 {data.total}개 | 페이지 {data.page} | 페이지당 {data.perPage}개
			</div>
		</div>
	);
};

export default LabelListPage;
