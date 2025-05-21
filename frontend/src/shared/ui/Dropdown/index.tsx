import { useEffect, useRef, useState } from 'react';
import type { DropdownOption } from './DropdownOption';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';

interface DropdownProps<T extends number | number[] | null> {
	label: string;
	panelLabel?: string;
	additionalOption?: DropdownOption;
	options: DropdownOption[];
	selectedOptions: T;
	onChange: (selectedOptions: T) => void;
	isLoading?: boolean;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	isAlignRight?: boolean;
}

export function Dropdown<T extends number | number[] | null>({
	label,
	panelLabel,
	options,
	selectedOptions,
	onChange,
	isLoading,
	error,
	disabled,
	className,
	isAlignRight,
}: DropdownProps<T>) {
	const [open, setOpen] = useState(false);
	const [alignRight, setAlignRight] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	// 정렬 방향 결정
	useEffect(() => {
		if (isAlignRight) setAlignRight(true);
		else if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			setAlignRight(rect.left > windowWidth * 0.7);
		}
	}, [open, isAlignRight]);

	// 바깥 클릭 닫기
	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent) => {
			if (!triggerRef.current?.parentElement?.contains(e.target as Node))
				setOpen(false);
		};
		window.addEventListener('mousedown', handler);
		return () => window.removeEventListener('mousedown', handler);
	}, [open]);

	return (
		<div className={`relative ${className}`}>
			<DropdownTrigger
				label={label}
				open={open}
				onClick={() => setOpen((o) => !o)}
				disabled={disabled}
				ref={triggerRef}
			/>
			<DropdownPanel
				open={open}
				alignRight={alignRight}
				options={options}
				selectedOptions={selectedOptions}
				onSelect={onChange}
				isLoading={isLoading}
				error={error}
				panelLabel={panelLabel}
			/>
		</div>
	);
}
