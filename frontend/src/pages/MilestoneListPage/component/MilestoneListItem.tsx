import { MilestoneEditForm } from './MilestoneEditForm';
import { MilestoneItemButtons } from './MilestoneItemButtons';

interface MilestoneListItemProps {
  milestone: any; // 타입 명확히 정의 필요
  className?: string;
  editing: boolean;
  onEdit: () => void;
  onCloseEdit: () => void;
}

export const MilestoneListItem = ({
  milestone,
  className = '',
  editing,
  onEdit,
  onCloseEdit,
}: MilestoneListItemProps) => {
  if (editing) {
    return (
      <MilestoneEditForm
        id={milestone.id}
        initialName={milestone.name}
        initialDescription={milestone.description}
        initialDeadline={milestone.deadline}
        onClose={onCloseEdit}
      />
    );
  }

  return (
    <div
      className={`w-full h-[96px] gap-8 px-8 flex flex-row items-center bg-[var(--neutral-surface-strong)] hover:bg-[var(--neutral-surface-default)] ${className}`}
    >
      {/* 이름, 날짜, 설명 등 milestone 주요 정보 표시 */}
      <div className="flex flex-col gap-1 w-[220px]">
        <span className="font-display-bold-16 text-[var(--neutral-text-strong)]">{milestone.name}</span>
        <span className="font-display-medium-12 text-[var(--neutral-text-weak)]">{milestone.deadline || ''}</span>
      </div>
      <span className="flex-1 font-display-medium-16 text-[var(--neutral-text-weak)]">{milestone.description || ''}</span>
      <MilestoneItemButtons id={milestone.id} onEdit={onEdit} />
    </div>
  );
};
