import EditIcon from '@/assets/edit.svg?react';
import RefreshCcwIcon from '@/assets/refreshCcw.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { useFetchLabelList } from '@/entities/label/hooks/useFetchLabelList';
import { useUpdateLabel } from '@/entities/label/hooks/useUpdateLabel';
import { Input } from '@/shared/ui/Input';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { getRandomHexColor } from './utils/getRandomColor';
import {
	LABEL_TEXT_COLORS,
	type LabelTextColor,
} from './utils/labelTextColors';
import { validateLabelForm } from './utils/labelValidation';

const DEFAULT_BG_COLOR = '#FEFEFE';
const DEFAULT_TEXT_COLOR = '#6E7191';

interface LabelEditProps {
	id: number;
	initialName: string;
	initialDescription: string;
	initialBackgroundColor: string;
	initialTextColor: string;
	onClose: () => void;
}

export function LabelEditForm({
	id,
	initialName,
	initialDescription,
	initialBackgroundColor,
	onClose,
}: LabelEditProps) {
	const { refetch: LabelListRefetch } = useFetchLabelList();
	const { mutate: labelUpdateMutate } = useUpdateLabel(() => {
		LabelListRefetch();
		onClose();
	});

	const [name, setName] = useState<string>(initialName);
	const [description, setDescription] = useState<string>(initialDescription);
	const [backgroundColor, setBackgroundColor] = useState<string>(
		initialBackgroundColor,
	);
	const [textColor, setTextColor] = useState<LabelTextColor | ''>('');

	const onUpdateLabel = () => {
		const errorMsg = validateLabelForm({
			name,
			backgroundColor,
			textColor,
		});
		if (errorMsg) {
			toast.error(errorMsg);
			return;
		}
		labelUpdateMutate({
			payload: {
				id,
				name,
				description,
				backgroundColor,
				textColor:
					LABEL_TEXT_COLORS.find((opt) => opt.value === textColor)?.code ??
					'#FFFFFF',
			},
		});
	};

	return (
		<div className='w-[1280px] flex flex-col gap-8 p-8 bg-[var(--neutral-surface-strong)]'>
			{/* title */}
			<span className='font-display-bold-20 text-[var(--neutral-text-strong)]'>
				레이블 편집
			</span>
			{/* preview & form */}
			<div className='flex gap-6'>
				<Preview
					name={name}
					backgroundColor={backgroundColor}
					textColor={
						LABEL_TEXT_COLORS.find((opt) => opt.value === textColor)?.code ?? ''
					}
				/>
				<div className='flex flex-1 flex-col gap-4'>
					<Input
						type='basic'
						placeholder='레이블의 이름을 입력하세요'
						fixedValue='이름'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type='basic'
						placeholder='레이블에 대한 설명을 입력하세요'
						fixedValue='설명(선택)'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<ColorInput
						backgroundColor={backgroundColor}
						setBackgroundColor={setBackgroundColor}
						textColor={textColor}
						setTextColor={(e) => setTextColor(e.target.value as LabelTextColor)}
					/>
				</div>
			</div>
			{/* buttons */}
			<div className='flex flex-row gap-4 justify-end'>
				<CancelButton onClick={onClose} />
				<CompleteButton onClick={onUpdateLabel} />
			</div>
		</div>
	);
}

interface PreviewProps {
	name: string;
	textColor: string;
	backgroundColor: string;
}
const Preview = ({ name, backgroundColor, textColor }: PreviewProps) => (
	<div className='w-[288px] h-[153px] flex items-center justify-center border border-[var(--neutral-border-default)] rounded-2xl'>
		<LabelChip
			name={name || 'label'}
			backgroundColor={backgroundColor || DEFAULT_BG_COLOR}
			textColor={textColor || DEFAULT_TEXT_COLOR}
		/>
	</div>
);

interface ColorInputProps {
	backgroundColor: string;
	setBackgroundColor: (value: string) => void;
	textColor: string;
	setTextColor: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const ColorInput = ({
	backgroundColor,
	setBackgroundColor,
	textColor,
	setTextColor,
}: ColorInputProps) => {
	const optionClassName =
		'font-available-medium-16 text-[var(--neutral-text-default)]';

	return (
		<div className='flex flex-row gap-6'>
			<div
				className='flex items-center h-10 rounded-[16px] px-4 w-[240px]
        focus-within:outline-[1px] focus-within:outline-[var(--brand-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]'
				style={{ outlineOffset: -1 }}
			>
				<span className='w-16 mr-2 font-display-medium-12 text-[var(--neutral-text-weak)]'>
					배경 색상
				</span>
				<input
					className='w-[112px] bg-transparent border-none outline-none
            font-display-medium-16 text-[var(--neutral-text-default)]
            placeholder:text-[var(--neutral-text-weak)]'
					placeholder='#FEFEFE'
					value={backgroundColor}
					onChange={(e) => setBackgroundColor(e.target.value)}
				/>
				<button
					type='button'
					onClick={() => setBackgroundColor(getRandomHexColor())}
				>
					<RefreshCcwIcon className='size-4' />
				</button>
			</div>
			<select
				value={textColor}
				onChange={setTextColor}
				className={`w-[104px] ${optionClassName} `}
			>
				<option value=''>텍스트 색상</option>
				{LABEL_TEXT_COLORS.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

interface CancelButtonProps {
	onClick: () => void;
}
const CancelButton = ({ onClick }: CancelButtonProps) => (
	<Button variant='outline' size='sm' onClick={onClick}>
		<XSquareIcon className='size-4' />
		취소
	</Button>
);

interface CompleteButtonProps {
	onClick: () => void;
}
const CompleteButton = ({ onClick }: CompleteButtonProps) => (
	<Button variant='contained' size='sm' onClick={onClick}>
		<EditIcon className='size-4' />
		편집 완료
	</Button>
);
