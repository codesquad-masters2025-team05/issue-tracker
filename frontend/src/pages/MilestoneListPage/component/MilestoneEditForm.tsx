import CalendarIcon from '@/assets/calendar.svg?react';
import EditIcon from '@/assets/edit.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { useFetchMilestoneList } from '@/entities/milestone/hooks/useFetchMilestoneList';
import { useUpdateMilestone } from '@/entities/milestone/hooks/useUpdateMilestone';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface MilestoneEditFormProps {
	id: number;
	initialName: string;
	initialDescription?: string;
	initialDeadline?: string;
	onClose: () => void;
}

export function MilestoneEditForm({
	id,
	initialName,
	initialDescription = '',
	initialDeadline = '',
	onClose,
}: MilestoneEditFormProps) {
	const { refetch: milestoneListRefetch } = useFetchMilestoneList();
	const { mutate: milestoneUpdateMutate } = useUpdateMilestone(() => {
		milestoneListRefetch();
		onClose();
	});

	const [name, setName] = useState<string>(initialName);
	const [description, setDescription] = useState<string>(initialDescription);
	const [deadline, setDeadline] = useState<string>(initialDeadline);
	const [deadlineError, setDeadlineError] = useState<string>('');

	// YYYY-MM-DD 형식 체크
	const isValidDateFormat = (value: string) =>
		value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value);

	const onChangeDeadline = (value: string) => {
		setDeadline(value);
		if (!isValidDateFormat(value)) {
			setDeadlineError('YYYY-MM-DD 형식으로 입력해주세요.');
		} else {
			setDeadlineError('');
		}
	};

	const onUpdateMilestone = () => {
		if (!name.trim()) {
			toast.error('이름을 입력해주세요.');
			return;
		}
		if (deadline && !isValidDateFormat(deadline)) {
			setDeadlineError('YYYY-MM-DD 형식으로 입력해주세요.');
			return;
		}
		milestoneUpdateMutate({
			payload: {
				id,
				name,
				description,
				deadline: deadline || undefined,
			},
		});
	};

	return (
		<div className='w-[1280px] flex flex-col gap-8 p-8 bg-[var(--neutral-surface-strong)]'>
			{/* 타이틀 */}
			<span className='font-display-bold-20 text-[var(--neutral-text-strong)]'>
				마일스톤 편집
			</span>
			{/* 프리뷰 + 폼 */}
			<div className='flex gap-6'>
				<Preview name={name} description={description} deadline={deadline} />
				<div className='flex flex-1 flex-col gap-4'>
					<Input
						type='basic'
						placeholder='마일스톤의 이름을 입력하세요'
						fixedValue='이름'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type='basic'
						placeholder='마일스톤에 대한 설명을 입력하세요'
						fixedValue='설명(선택)'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<DeadlineInput
						value={deadline}
						onChange={onChangeDeadline}
						error={deadlineError}
					/>
				</div>
			</div>
			{/* 버튼 */}
			<div className='flex flex-row gap-4 justify-end'>
				<CancelButton onClick={onClose} />
				<CompleteButton
					onClick={onUpdateMilestone}
					disabled={!name || !!deadlineError}
				/>
			</div>
		</div>
	);
}

interface PreviewProps {
	name: string;
	description?: string;
	deadline?: string;
}
function Preview({ name, description, deadline }: PreviewProps) {
	return (
		<div className='w-[288px] h-[153px] flex flex-col justify-center gap-2 px-6 border border-[var(--neutral-border-default)] rounded-2xl bg-white'>
			<span className='font-display-bold-16 text-[var(--neutral-text-strong)] break-words'>
				{name || '마일스톤 이름'}
			</span>
			<span className='font-display-medium-12 text-[var(--neutral-text-weak)] break-words'>
				{description || '설명(선택)'}
			</span>
			<span className='flex items-center gap-1 font-display-medium-12 text-[var(--neutral-text-default)]'>
				<CalendarIcon className='size-4' />
				{deadline || '완료일(선택)'}
			</span>
		</div>
	);
}

interface DeadlineInputProps {
	value: string;
	onChange: (v: string) => void;
	error?: string;
}
function DeadlineInput({ value, onChange, error }: DeadlineInputProps) {
	return (
		<div className='flex flex-col gap-1'>
			<div
				className='flex items-center h-10 rounded-[16px] px-4 w-[240px]
        focus-within:outline-[1px] focus-within:outline-[var(--brand-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]'
				style={{ outlineOffset: -1 }}
			>
				<span className='w-16 mr-2 font-display-medium-12 text-[var(--neutral-text-weak)]'>
					완료일
				</span>
				<input
					className='w-[140px] bg-transparent border-none outline-none font-display-medium-16 text-[var(--neutral-text-default)] placeholder:text-[var(--neutral-text-weak)]'
					placeholder='YYYY-MM-DD'
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
			{error && (
				<span className='text-[var(--danger-text-default)] font-display-medium-12'>
					{error}
				</span>
			)}
		</div>
	);
}

interface CancelButtonProps {
	onClick: () => void;
}
function CancelButton({ onClick }: CancelButtonProps) {
	return (
		<Button variant='outline' size='sm' onClick={onClick}>
			<XSquareIcon className='size-4' />
			취소
		</Button>
	);
}

interface CompleteButtonProps {
	onClick: () => void;
	disabled?: boolean;
}
function CompleteButton({ onClick, disabled }: CompleteButtonProps) {
	return (
		<Button variant='contained' size='sm' onClick={onClick} disabled={disabled}>
			<EditIcon className='size-4' />
			편집 완료
		</Button>
	);
}
