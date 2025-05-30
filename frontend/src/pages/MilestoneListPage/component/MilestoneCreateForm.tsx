import CalendarIcon from '@/assets/calendar.svg?react';
import PlusIcon from '@/assets/plus.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { useCreateMilestone } from '@/entities/milestone/hooks/useCreateMilestone';
import { useFetchMilestoneList } from '@/entities/milestone/hooks/useFetchMilestoneList';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface MilestoneCreateFormProps {
	onClose: () => void;
}

export function MilestoneCreateForm({ onClose }: MilestoneCreateFormProps) {
	const { refetch: milestoneListRefetch } = useFetchMilestoneList();
	const { mutate: milestoneCreateMutate } = useCreateMilestone(() => {
		milestoneListRefetch();
		onClose();
	});

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [deadline, setDeadline] = useState('');
	const [deadlineError, setDeadlineError] = useState('');

	// YYYY-MM-DD 유효성 검사
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

	const onCreateMilestone = () => {
		if (!name.trim()) {
			toast.error('이름을 입력해주세요.');
			return;
		}
		if (deadline && !isValidDateFormat(deadline)) {
			setDeadlineError('YYYY-MM-DD 형식으로 입력해주세요.');
			return;
		}
    milestoneCreateMutate({
      payload: {
        name,
        description: description ? description : null,
        deadline: deadline ? deadline : null,
      },
    });
	};

	return (
		<div className='w-[1280px] flex flex-col gap-8 p-8 bg-[var(--neutral-surface-strong)] border border-[var(--neutral-border-default)] rounded-2xl'>
			<span className='font-display-bold-20 text-[var(--neutral-text-strong)]'>
				새로운 마일스톤 추가
			</span>

			<div className='flex gap-6'>
				<div className='flex flex-1 flex-col gap-4'>
					<div className='flex flex-row gap-4'>
						<div className='flex-1'>
							<Input
								type='basic'
								placeholder='마일스톤의 이름을 입력하세요'
								fixedValue='이름'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='flex-1'>
							<DeadlineInput
								value={deadline}
								onChange={onChangeDeadline}
								error={deadlineError}
							/>
						</div>
					</div>
					<Input
						type='basic'
						placeholder='마일스톤에 대한 설명을 입력하세요'
						fixedValue='설명(선택)'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>

			<div className='flex flex-row gap-4 justify-end'>
				<CancelButton onClick={onClose} />
				<CompleteButton
					onClick={onCreateMilestone}
					disabled={!name || !!deadlineError}
				/>
			</div>
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
				className='flex items-center h-10 rounded-[16px] px-4 w-full
        focus-within:outline-[1px] focus-within:outline-[var(--brand-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]'
				style={{ outlineOffset: -1 }}
			>
				<span className='w-16 mr-2 font-display-medium-12 text-[var(--neutral-text-weak)]'>
					완료일(선택)
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
			<PlusIcon className='size-4' />
			완료
		</Button>
	);
}
