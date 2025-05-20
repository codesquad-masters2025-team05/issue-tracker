import { useEffect, useRef, useState } from 'react';
import type { DropdownOption } from './DropdownOption';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';

interface SidebarDropdownProps {
	label: string;
	panelLabel?: string;
	options: DropdownOption[];
	value: string | null;
	onChange: (value: string | null) => void;
	isLoading?: boolean;
	error?: boolean;
	renderOption?: (opt: DropdownOption, isSelected: boolean) => React.ReactNode;
	disabled?: boolean;
	className?: string;
}

export function SidebarDropdown({
	label,
	panelLabel,
	options,
	value,
	onChange,
	isLoading,
	error,
	renderOption,
	disabled,
	className,
}: SidebarDropdownProps) {
	const [open, setOpen] = useState(false);
	const [alignRight, setAlignRight] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	// 정렬 방향 결정
	useEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			setAlignRight(rect.left > windowWidth * 0.7);
		}
	}, [open]);

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
				value={value}
				onSelect={(v) => {
					setOpen(false);
					onChange(v);
				}}
				isLoading={isLoading}
				error={error}
				panelLabel={panelLabel}
				renderOption={renderOption}
			/>
		</div>
	);
}
