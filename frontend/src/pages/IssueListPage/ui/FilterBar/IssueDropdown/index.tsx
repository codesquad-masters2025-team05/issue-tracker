import { useEffect, useRef, useState } from 'react';
import type { DropdownOption } from './DropdownOption';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';

interface DropdownProps {
	label: string;
	panelLabel: string;
	options: DropdownOption[];
	isLoading?: boolean;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	isAlignRight?: boolean;
}

export function Dropdown({
	label,
	panelLabel,
	options,
	className,
}: DropdownProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

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
				ref={triggerRef}
			/>
			<DropdownPanel open={open} options={options} panelLabel={panelLabel} />
		</div>
	);
}
