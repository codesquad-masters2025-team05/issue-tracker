import CheckOffCircleIcon from '@/assets/checkOffCircle.svg?react';
import CheckOnCircleIcon from '@/assets/checkOnCircle.svg?react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Spinner } from '@/shared/ui/spinner';
import { cn } from '@/shared/utils/shadcn-utils';
import type { DropdownOption } from './DropdownOption';

interface DropdownPanelProps {
	open: boolean;
	alignRight?: boolean;
	options: DropdownOption[];
	value: string | null;
	onSelect: (value: string) => void;
	isLoading?: boolean;
	error?: boolean;
	panelLabel?: string;
	renderOption?: (opt: DropdownOption, isSelected: boolean) => React.ReactNode;
	className?: string;
}

export function DropdownPanel({
	open,
	alignRight,
	options,
	value,
	onSelect,
	isLoading,
	error,
	panelLabel,
	renderOption,
	className,
}: DropdownPanelProps) {
	if (!open) return null;

	return (
		<div
			className={cn(
				'absolute mt-2 w-[240px] bg-[var(--neutral-surface-default)] rounded-[16px] shadow-lg border border-[var(--neutral-border-default)] overflow-hidden z-50',
				alignRight ? 'right-0' : 'left-0',
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
					<Spinner />
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
						const isSelected = value === opt.value;
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
								onClick={() => onSelect(opt.value)}
								aria-selected={isSelected}
								// biome-ignore lint/a11y/useSemanticElements: <explanation>
								role='option'
								tabIndex={0}
							>
								{renderOption ? (
									renderOption(opt, isSelected)
								) : (
									<>
										{/* 아바타(담당자) or 컬러원(레이블) */}
										{opt.imageUrl ? (
											<Avatar className='size-5'>
												<AvatarImage src={opt.imageUrl} alt={opt.display} />
												<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
											</Avatar>
										) : opt.color ? (
											<span
												className='inline-block w-5 h-5 rounded-full'
												style={{ backgroundColor: opt.color }}
											/>
										) : null}
										{/* 텍스트 */}
										<span>{opt.display}</span>
										{/* 체크박스 아이콘 */}
										<span className='ml-auto relative w-4 h-4 flex items-center justify-center'>
											{isSelected ? (
												<CheckOnCircleIcon className='size-4' />
											) : (
												<CheckOffCircleIcon className='size-4' />
											)}
										</span>
									</>
								)}
							</button>
						);
					})
				)}
			</div>
		</div>
	);
}
