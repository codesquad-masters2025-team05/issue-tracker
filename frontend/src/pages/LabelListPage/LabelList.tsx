import { useFetchLabelList } from '@/entities/label/hooks/useFetchLabelList';
import type {
	LabelApiEntity,
	LabelListData,
} from '@/entities/label/model/label.types';
import { LabelChip } from '@/shared/ui/LabelChip';
import type { UseQueryResult } from '@tanstack/react-query';

export const LabelList = () => {
	const {
		data: labelListData,
		isLoading,
		isError,
	}: UseQueryResult<LabelListData> = useFetchLabelList();
	const total = labelListData?.total;
	const labels = labelListData?.labels;

	if (isLoading) return <div>로딩 중...</div>;
	if (isError || !labelListData) return <div>에러 발생</div>;

	return (
		<div className='w-[1280px] border border-[var(--neutral-border-default)] rounded-2xl'>
			<div className='px-8 py-5 font-display-bold-16 text-[var(--neutral-text-default)]'>{`${total}개의 레이블`}</div>
			{labels?.map((label, idx) => (
				<>
					<HorizontalDivision key={label.id} />
					<LabelListItem
						key={label.id}
						label={label}
						className={labels.length - 1 === idx ? 'rounded-b-2xl' : ''}
					/>
				</>
			))}
		</div>
	);
};

const HorizontalDivision = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const LabelListItem = ({
	label,
	className,
}: { label: LabelApiEntity; className: string }) => {
	return (
		<div
			className={`w-full h-[96px] gap-8 px-8 flex flex-row items-center bg-[var(--neutral-surface-strong)] hover:bg-[var(--neutral-surface-default)] ${className}`}
		>
			<div className='w-[176px]'>
				<LabelChip
					name={label.name}
					textColor={label.textColor}
					backgroundColor={label.backgroundColor}
				/>
			</div>
			<span className='flex-1 font-display-medium-16 text-[var(--neutral-text-weak)]'>
				{label.description || ''}
			</span>
			<div className='w-[106px]'>buttons</div>
		</div>
	);
};
