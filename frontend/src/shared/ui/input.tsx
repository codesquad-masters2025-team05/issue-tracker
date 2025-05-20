import { type InputHTMLAttributes, useId } from 'react';

type TextInputStyleType = 'floating' | 'basic';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	type?: TextInputStyleType;
	label?: string;
	value: string;
	fixedValue?: string;
}

export function Input({
	type = 'floating',
	label,
	placeholder = '',
	fixedValue,
	id,
	value,
	onChange,
	...props
}: TextInputProps) {
	const inputId = id ?? useId();

	// floating 모드일 때 label 표시 여부
	const showFloatingLabel = type === 'floating' && value.length > 0;

	// ─── basic 모드 ───────────────────────────────
	if (type === 'basic') {
		return (
			<div
				className='
          flex items-center h-10 rounded-[16px] px-4
          focus-within:outline-[1px] focus-within:outline-[var(--brand-border-active)]
        	bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]'
				style={{ outlineOffset: -1 }}
			>
				{/* 왼쪽에 고정 텍스트 */}
				{fixedValue != null && (
					<span className='mr-4 font-display-medium-12 text-[var(--neutral-text-weak)]'>
						{fixedValue}
					</span>
				)}

				{/* 오른쪽에만 editable input */}
				<input
					id={inputId}
					className='
            flex-1 bg-transparent border-none outline-none
            font-display-medium-16 text-[var(--neutral-text-default)]
            placeholder:text-[var(--neutral-text-weak)]
          '
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					{...props}
				/>
			</div>
		);
	}

	// ─── floating 모드 ───────────────────────────
	return (
		<div
			className={`
        flex flex-col justify-center px-4 rounded-[16px]
				min-h-[56px]
        focus-within:outline focus-within:outline-[var(--neutral-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]
				font-display-medium-16
      `}
			style={{
				outlineOffset: -1,
			}}
		>
			{showFloatingLabel && (
				<label
					htmlFor={inputId}
					className='font-display-medium-12 text-[var(--neutral-text-weak)]'
				>
					{label || placeholder}
				</label>
			)}

			<input
				id={inputId}
				className='
          w-full bg-transparent border-none outline-none
          font-display-medium-16 text-[var(--neutral-text-default)]
          placeholder:text-[var(--neutral-text-weak)]
        '
				placeholder={showFloatingLabel ? '' : placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}
