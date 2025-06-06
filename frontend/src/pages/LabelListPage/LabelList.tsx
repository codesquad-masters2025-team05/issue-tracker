import EditIcon from '@/assets/edit.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useDeleteLabel } from '@/entities/label/hooks/useDeleteLabel';
import { useFetchLabelList } from '@/entities/label/hooks/useFetchLabelList';
import type {
	LabelApiEntity,
	LabelListData,
} from '@/entities/label/model/label.types';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { LabelChip } from '@/shared/ui/LabelChip';
import type { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { LabelEditForm } from './LabelEditForm';

export const LabelList = () => {
	const { data: labelListData, refetch }: UseQueryResult<LabelListData> =
		useFetchLabelList();

	useEffect(() => {
		refetch;
	}, [refetch]);

	const total = labelListData?.total ?? 0;
	const labels = labelListData?.labels ?? [];

	// "한 번에 한 행만 편집"을 위한 editingId state!
	const [editingId, setEditingId] = useState<number | null>(null);

	return (
		<div className='border border-[var(--neutral-border-default)] rounded-2xl'>
			<div className='px-8 py-5 font-display-bold-16 text-[var(--neutral-text-default)]'>{`${total}개의 레이블`}</div>
			{labels.map((label, idx) => (
				<div key={label.id}>
					<HorizontalDivision />
					<LabelListItem
						label={label}
						className={labels.length - 1 === idx ? 'rounded-b-2xl' : ''}
						editing={editingId === label.id}
						onEdit={() => setEditingId(label.id)}
						onCloseEdit={() => setEditingId(null)}
					/>
				</div>
			))}
		</div>
	);
};

const HorizontalDivision = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

interface LabelListItemProps {
	label: LabelApiEntity;
	className?: string;
	editing: boolean;
	onEdit: () => void;
	onCloseEdit: () => void;
}

const LabelListItem = ({
	label,
	className = '',
	editing,
	onEdit,
	onCloseEdit,
}: LabelListItemProps) => {
	if (editing) {
		return (
			<LabelEditForm
				id={label.id}
				initialName={label.name}
				initialDescription={label.description}
				initialBackgroundColor={label.backgroundColor}
				initialTextColor={label.textColor}
				onClose={onCloseEdit}
			/>
		);
	}

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
			<LabelItemButtons id={label.id} onEdit={onEdit} />
		</div>
	);
};

interface LabelItemButtonsProps {
	id: number;
	onEdit: () => void;
}

const LabelItemButtons = ({ id, onEdit }: LabelItemButtonsProps) => {
	const { refetch } = useFetchLabelList();
	const { mutate: deleteLabelMutate, isPending: isDeleting } =
		useDeleteLabel(refetch);

	// 모달 open 상태
	const [open, setOpen] = useState(false);

	const handleDeleteClick = () => setOpen(true);

	const handleConfirmDelete = () => {
		deleteLabelMutate(id);
		setOpen(false);
	};

	const handleCancel = () => setOpen(false);

	return (
		<div className='flex gap-6'>
			<button
				type='button'
				className='flex items-center gap-1 text-[var(--neutral-text-default)] font-available-medium-12'
				onClick={onEdit}
			>
				<EditIcon className='size-4' />
				편집
			</button>
			<button
				type='button'
				className='flex items-center gap-1 text-[var(--danger-text-default)] font-available-medium-12'
				onClick={handleDeleteClick}
				disabled={isDeleting}
			>
				<TrashIcon className='size-4' />
				삭제
			</button>
			<ConfirmModal
				open={open}
				text='정말 이 레이블을 삭제하시겠습니까?'
				confirmText='삭제'
				cancelText='취소'
				onConfirm={handleConfirmDelete}
				onCancel={handleCancel}
				isDanger
			/>
		</div>
	);
};
