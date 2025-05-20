import GripIcon from '@/assets/grip.svg?react';
import PaperCilpIcon from '@/assets/paperclip.svg?react';
import { type ChangeEvent, type TextareaHTMLAttributes, useId } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	value: string;
	onFileSelect: (files: FileList) => void;
	showCounter: boolean;
}

export function TextArea({
	label,
	placeholder = '',
	id,
	value,
	onChange,
	onFileSelect,
	showCounter,
	...props
}: TextAreaProps) {
	const baseId = id ?? useId();

	// floating 모드일 때 label 표시 여부
	const showLabel = value.length > 0;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onFileSelect(e.target.files);
		}
	};

	return (
		<div
			className='
        flex flex-1 flex-col justify-center rounded-[16px]
				min-h-[184px]
        focus-within:outline focus-within:outline-[var(--neutral-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]
				font-display-medium-16
      '
			style={{
				outlineOffset: -1,
			}}
		>
			<div
				className='
          flex flex-col pt-4 px-4 gap-2 flex-1
        '
			>
				{showLabel && (
					<label
						htmlFor={`${baseId}-text`}
						className='font-display-medium-12 text-[var(--neutral-text-weak)]'
					>
						{label || placeholder}
					</label>
				)}

				<textarea
					id={`${baseId}-text`}
					className='
            flex flex-1 w-full bg-transparent border-none outline-none
            font-display-medium-16 text-[var(--neutral-text-default)]
            placeholder:text-[var(--neutral-text-weak)]
            resize-none
          '
					placeholder={showLabel ? '' : placeholder}
					value={value}
					onChange={onChange}
					rows={3}
					{...props}
				/>
			</div>

			<div className='flex flex-col text-[var(--neutral-text-weak)]'>
				<div className='flex flex-row items-center justify-end p-4 gap-2 h-13'>
					<span className='font-available-medium-12'>{`띄어쓰기 포함 ${value.length}자`}</span>
					<GripIcon className='size-4 text-[var(--neutral-text-weak)]' />
				</div>

				{/* division */}
				<div className='border-t border-dashed border-[var(--neutral-border-default)]' />

				<input
					id={`${baseId}-file`}
					type='file'
					className='hidden'
					onChange={handleChange}
				/>
				<label
					htmlFor={`${baseId}-file`}
					className='flex items-center px-4 h-13 cursor-pointer select-none'
				>
					<PaperCilpIcon className='size-4' />
					<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
						파일 첨부하기
					</span>
					{/* 여기에 첨부된 파일 목록 뜨게 해줘*/}
				</label>
			</div>
		</div>
	);
}
