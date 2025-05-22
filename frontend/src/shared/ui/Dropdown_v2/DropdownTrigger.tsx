import ChevronDownIcon from '@/assets/chevronDown.svg?react';
import { cn } from '@/shared/utils/shadcn-utils';
import React from 'react';

interface DropdownTriggerProps {
	label: string;
	open: boolean;
	disabled?: boolean;
	onClick: () => void;
	className?: string;
	children?: React.ReactNode;
}

export const DropdownTrigger = React.forwardRef<
	HTMLButtonElement,
	DropdownTriggerProps
>(({ label, open, disabled, onClick, className, children }, ref) => {
	return (
		<button
			type='button'
			aria-haspopup='listbox'
			aria-expanded={open}
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'flex items-center justify-between w-full h-10 px-4 rounded-xl bg-transparent font-bold text-[16px] transition',
				'text-[var(--neutral-text-default)] hover:bg-[var(--neutral-surface-bold)]',
				className,
			)}
			ref={ref}
		>
			<span>{label}</span>
			<ChevronDownIcon
				className={cn('size-4 ml-1 transition-transform', open && 'rotate-180')}
			/>
			{children}
		</button>
	);
});
