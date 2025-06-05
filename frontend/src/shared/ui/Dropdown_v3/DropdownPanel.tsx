import CheckOffCircleIcon from '@/assets/checkOffCircle.svg?react';
import CheckOnCircleIcon from '@/assets/checkOnCircle.svg?react';
import { Spinner } from '@/shared/ui/spinner';
import { cn } from '@/shared/utils/shadcn-utils';
import type { DropdownOption } from './DropdownOption';

interface DropdownPanelProps {
	open: boolean;
	closePanel: () => void;
	alignRight?: boolean;
	options: DropdownOption[];
	isLoading?: boolean;
	error?: boolean;
	panelLabel?: string;
	className?: string;
}

export function DropdownPanel({
	open,
	closePanel,
	alignRight,
	options,
	isLoading,
	error,
	panelLabel,
	className,
}: DropdownPanelProps) {
	if (!open) return null;

	return (
		<div
			className={cn(
				'absolute mt-2 w-[240px] bg-[var(--neutral-surface-default)] rounded-[16px] shadow-lg border border-[var(--neutral-border-default)] overflow-hidden z-50',
				alignRight ? 'right-0' : 'left-0',
				'animate-in fade-in-0 zoom-in-95',
				className,
			)}
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role='listbox'
			tabIndex={-1}
			style={{
				boxShadow: 'var(--shadow-light)',
			}}
		>
			{/* 헤더 */}
			{panelLabel && (
				<div className='font-display-medium-12 px-4 py-2 text-[var(--neutral-text-weak)] bg-[var(--neutral-surface-default)] min-h-[32px] flex items-center'>
					{panelLabel}
				</div>
			)}

			{/* 옵션 목록 */}
			<div
				className='max-h-[420px] overflow-y-auto dropdown-scrollbar'
				style={{
					scrollbarWidth: 'thin',
					scrollbarColor: 'var(--neutral-border-default) transparent',
				}}
			>
				{isLoading ? (
					<Spinner className='flex items-center justify-center' />
				) : error ? (
					<div className='p-4 text-[var(--danger-text-default)]'>
						데이터를 불러올 수 없습니다.
					</div>
				) : options.length === 0 ? (
					<div className='p-4 text-[var(--neutral-text-weak)]'>
						항목이 없습니다.
					</div>
				) : (
					options.map((opt, idx) => (
						<button
							key={opt.id}
							type='button'
							className={cn(
								'flex items-center gap-2 w-full text-left px-4 py-2 min-h-[44px] cursor-pointer',
								'bg-[var(--neutral-surface-strong)] border-t border-[var(--neutral-border-default)] hover:bg-[var(--neutral-surface-default)]',
								idx === options.length - 1 && 'rounded-b-[16px]',
								opt.isSelected
									? 'font-selected-bold-16 text-[var(--neutral-text-strong)]'
									: 'font-available-medium-16 text-[var(--neutral-text-default)]',
							)}
							onClick={() => {
								opt.onClick();
								closePanel();
							}}
							aria-selected={opt.isSelected}
							// biome-ignore lint/a11y/useSemanticElements: <explanation>
							role='option'
							tabIndex={0}
						>
							{/* 아바타 또는 텍스트 */}
							{opt.avatar ? <span className='mr-2'>{opt.avatar}</span> : null}
							<span>{opt.display}</span>

							{/* 체크 아이콘 */}
							<span className='ml-auto relative w-4 h-4 flex items-center justify-center'>
								{opt.isSelected ? (
									<CheckOnCircleIcon className='size-4' />
								) : (
									<CheckOffCircleIcon className='size-4' />
								)}
							</span>
						</button>
					))
				)}
			</div>
		</div>
	);
}
