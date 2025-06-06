import CheckOffCircleIcon from '@/assets/checkOffCircle.svg?react';
import CheckOnCircleIcon from '@/assets/checkOnCircle.svg?react';
import { Spinner } from '@/shared/ui/spinner';
import { cn } from '@/shared/utils/shadcn-utils';
import { OptionAvatarLabel } from '../AvatarLabel';
import type { DropdownOption } from './DropdownOption';

interface DropdownPanelProps<T extends number | number[] | null> {
	open: boolean;
	alignRight?: boolean;
	options: DropdownOption[];
	selectedOptions: T;
	onSelect: (selectedOptions: T) => void;
	isLoading?: boolean;
	error?: boolean;
	panelLabel?: string;
	className?: string;
}

export function DropdownPanel<T extends number | number[] | null>({
	open,
	alignRight,
	options,
	selectedOptions,
	onSelect,
	isLoading,
	error,
	panelLabel,
	className,
}: DropdownPanelProps<T>) {
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
			<div>
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
					options.map((opt, idx) => {
						const isSelected = Array.isArray(selectedOptions)
							? selectedOptions.includes(opt.id)
							: selectedOptions === opt.id;
						return (
							<button
								key={opt.id}
								type='button'
								className={cn(
									'flex items-center gap-2 w-full text-left px-4 py-2 min-h-[44px] cursor-pointer',
									'bg-[var(--neutral-surface-strong)] border-t border-[var(--neutral-border-default)] hover:bg-[var(--neutral-surface-default)]',
									idx === options.length - 1 && 'rounded-b-[16px]',
									isSelected
										? 'font-selected-bold-16 text-[var(--neutral-text-strong)]'
										: 'font-available-medium-16 text-[var(--neutral-text-default)]',
								)}
								onClick={() => {
									if (Array.isArray(selectedOptions)) {
										const next = selectedOptions.includes(opt.id)
											? selectedOptions.filter((id) => id !== opt.id)
											: [...selectedOptions, opt.id];
										onSelect(next as T);
									} else {
										const next = selectedOptions === opt.id ? null : opt.id;
										onSelect(next as T);
									}
								}}
								aria-selected={isSelected}
								// biome-ignore lint/a11y/useSemanticElements: <explanation>
								role='option'
								tabIndex={0}
							>
								{/* 아바타(담당자) or 컬러원(레이블) */}
								{'imageUrl' in opt ? (
									<OptionAvatarLabel
										key={opt.id}
										imageUrl={opt.imageUrl}
										text={opt.display}
									/>
								) : 'color' in opt ? (
									<>
										<span
											className='inline-block w-5 h-5 rounded-full'
											style={{ backgroundColor: opt.color }}
										/>
										<span>{opt.display}</span>
									</>
								) : (
									<span>{opt.display}</span>
								)}
								{/* 체크박스 아이콘 */}
								<span className='ml-auto relative w-4 h-4 flex items-center justify-center'>
									{isSelected ? (
										<CheckOnCircleIcon className='size-4' />
									) : (
										<CheckOffCircleIcon className='size-4' />
									)}
								</span>
							</button>
						);
					})
				)}
			</div>
		</div>
	);
}
