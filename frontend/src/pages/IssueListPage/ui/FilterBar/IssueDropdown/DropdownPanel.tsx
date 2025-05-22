import CheckOffCircleIcon from '@/assets/checkOffCircle.svg?react';
import CheckOnCircleIcon from '@/assets/checkOnCircle.svg?react';
import { cn } from '@/shared/utils/shadcn-utils';
import { useSearchParams } from 'react-router-dom';
import type { DropdownOption } from './DropdownOption';

interface DropdownPanelProps {
	open: boolean;
	options: DropdownOption[];
	isLoading?: boolean;
	error?: boolean;
	panelLabel?: string;
	className?: string;
}

export function DropdownPanel({
	open,
	options,
	panelLabel,
	className,
}: DropdownPanelProps) {
	if (!open) return null;
	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get('q') ?? '';

	return (
		<div
			className={cn(
				'absolute mt-2 w-[240px] bg-[var(--neutral-surface-default)] rounded-[16px] shadow-lg border border-[var(--neutral-border-default)] overflow-hidden z-50',
				'left-0',
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
				{options.map((opt, idx) => {
					const categoryKeyArray = [
						'is',
						'author',
						'assignee',
						'commented',
						'is',
					];
					const valueArray = ['open', '@me', '@me', '@me', 'closed'];
					const isSelected = valueArray[idx]
						? hasKeyValue(q, categoryKeyArray[idx], valueArray[idx])
						: false;

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
								const nextQ = addKeyValueToQ(
									q,
									categoryKeyArray[idx],
									valueArray[idx],
								);
								setSearchParams({ q: nextQ });
							}}
							aria-selected={isSelected}
							// biome-ignore lint/a11y/useSemanticElements: <explanation>
							role='option'
							tabIndex={0}
						>
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
						</button>
					);
				})}
			</div>
		</div>
	);
}

// q에 key:value가 포함되는지 체크
function hasKeyValue(q: string, key: string, value: string) {
	const formattedValue = value;
	const pattern = new RegExp(`\\b${key}:${escapeRegExp(formattedValue)}\\b`);
	return pattern.test(q);
}

// q에 key:value 추가 (공백으로 구분)
function addKeyValueToQ(q: string, key: string, value: string) {
	const formattedValue = value;
	return q.length > 0
		? `${q} ${key}:${formattedValue}`
		: `${key}:${formattedValue}`;
}

// 정규식 특수문자 이스케이프 (값에 :나 + 등이 들어올 경우 대비)
function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
