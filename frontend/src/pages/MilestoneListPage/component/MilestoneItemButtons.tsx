import EditIcon from '@/assets/edit.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useDeleteMilestone } from '@/entities/milestone/hooks/useDeleteMilestone';
import { useFetchMilestoneList } from '@/entities/milestone/hooks/useFetchMilestoneList';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useState } from 'react';

interface MilestoneItemButtonsProps {
  id: number;
  onEdit: () => void;
}

export const MilestoneItemButtons = ({ id, onEdit }: MilestoneItemButtonsProps) => {
  const { refetch } = useFetchMilestoneList();
  const { mutate: deleteMilestoneMutate, isPending: isDeleting } = useDeleteMilestone(refetch);

  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => setOpen(true);

  const handleConfirmDelete = () => {
    deleteMilestoneMutate(id);
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <div className="flex gap-6">
      <button
        type="button"
        className="flex items-center gap-1 text-[var(--neutral-text-default)] font-available-medium-12"
        onClick={onEdit}
      >
        <EditIcon className="size-4" />
        편집
      </button>
      <button
        type="button"
        className="flex items-center gap-1 text-[var(--danger-text-default)] font-available-medium-12"
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        <TrashIcon className="size-4" />
        삭제
      </button>
      <ConfirmModal
        open={open}
        text="정말 이 마일스톤을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};
