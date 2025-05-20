import CheckOffCircleIcon from '@/assets/checkOffCircle.svg?react';
import CheckOnCircleIcon from '@/assets/checkOnCircle.svg?react';
import ChevronDownIcon from '@/assets/chevronDown.svg?react';
import { Spinner } from '@/shared/ui/spinner';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '../utils/shadcn-utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export interface DropdownOption {
	id: number;
	value: string;
	display: string;
	imageUrl?: string;
	color?: string;
}

interface CustomDropdownPanelProps {
	label: string;
	panelLabel: string;
	options: DropdownOption[];
	value: string | null;
	onChange: (value: string | null) => void;
	className?: string;
	isLoading?: boolean;
	error?: boolean;
}

export function CustomDropdownPanel({
	label,
	panelLabel,
	options,
	value,
	onChange,
	className = '',
	isLoading,
	error,
}: CustomDropdownPanelProps) {
	const [open, setOpen] = useState(false);
	const [animating, setAnimating] = useState<'in' | 'out' | null>(null);
	const [alignRight, setAlignRight] = useState(false);
	const selectRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	// 드롭다운 열 때 에러 발생 시 토스트 알림
	useEffect(() => {
		if (error && open) {
			toast.error('목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
		}
	}, [error, open]);

	// open 시 트리거 버튼의 x 위치로 정렬 방식 결정
	useEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			// 화면 오른쪽 30% 이내면 오른쪽 정렬, 아니면 왼쪽 정렬
			setAlignRight(rect.left > windowWidth * 0.7);
		}
	}, [open]);

	// 패널 열기/닫기 애니메이션 제어
	// biome-ignore lint: animating은 effect 실행 조건에 영향을 주지 않으므로 의도적으로 의존성 배열에서 제외함
	useEffect(() => {
		if (open) {
			setAnimating('in');
		} else if (animating === 'in') {
			setAnimating('out');
			const timer = setTimeout(() => setAnimating(null), 120); // 애니메이션 길이와 동일하게
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	// 드롭다운 외부 클릭시 닫힘
	useEffect(() => {
		if (!open) return;
		const handleClick = (e: MouseEvent) => {
			if (!selectRef.current?.contains(e.target as Node)) setOpen(false);
		};
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, [open]);

	return (
		<div ref={selectRef} className={`relative w-20 h-8 ${className}`}>
			{/* Trigger Button */}
			<button
				ref={triggerRef}
				type='button'
				className='w-full h-full flex items-center justify-center gap-1 bg-transparent font-available-medium-16'
				style={{ color: 'var(--neutral-text-default)' }}
				onClick={() => setOpen((o) => !o)}
				aria-haspopup='listbox'
				aria-expanded={open}
			>
				<span className='whitespace-nowrap'>{label}</span>
				<ChevronDownIcon className='size-4' />
			</button>

			{/* 애니메이션을 위해 animating이 있을 때만 패널 렌더 */}
			{(open || animating === 'out') && (
				<div
					data-state={open ? 'open' : 'closed'}
					className={cn(
						'absolute mt-2 w-[240px] bg-[var(--neutral-surface-default)] rounded-[16px] shadow-lg border border-[var(--neutral-border-default)] overflow-hidden z-50',
						'transition-all duration-120',
						'bg-popover text-popover-foreground',
						'data-[state=open]:animate-in data-[state=closed]:animate-out',
						'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
						'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
						alignRight ? 'right-0' : 'left-0',
					)}
					style={{
						boxShadow: 'var(--shadow-light)',
						visibility: open ? 'visible' : 'hidden',
						pointerEvents: open ? 'auto' : 'none',
					}}
					// biome-ignore lint: 커스텀 UI 사용을 위한 ARIA role 사용
					role='listbox'
					tabIndex={-1}
				>
					{/* 헤더 */}
					<div
						className='font-display-medium-12 px-4 py-2'
						style={{
							background: 'var(--neutral-surface-default)',
							color: 'var(--neutral-text-weak)',
							borderTopLeftRadius: 16,
							borderTopRightRadius: 16,
							minHeight: 32,
							height: 32,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{panelLabel}
					</div>
					{/* 옵션 목록 */}
					<div>
						{/* spinner, error, none 에 대해 보여줄 컴포넌트는 리팩토링 필요. 현재는 간단하게 해둠 */}
						{isLoading ? (
							<Spinner />
						) : error ? (
							'데이터를 불러올 수 없습니다.'
						) : options.length === 0 ? (
							'항목이 없습니다.'
						) : (
							options.map((opt, idx) => {
								const isSelected = value === opt.value;
								return (
									<button
										key={opt.id}
										type='button'
										className={`flex items-center gap-2 w-full text-left
                    px-4 py-2 min-h-[44px] h-[44px] cursor-pointers
                    bg-[var(--neutral-surface-strong)]
                    border-t border-[var(--neutral-border-default)] 
                    hover:bg-[var(--neutral-surface-default)]
                    ${idx === options.length - 1 && 'rounded-b-[16px]'}
                    ${isSelected ? 'font-selected-bold-16 text-[var(--neutral-text-strong)]' : 'font-available-medium-16 text-[var(--neutral-text-default)]'}
                  `}
										onClick={() => {
											setOpen(false);
											onChange(opt.value);
										}}
										aria-selected={isSelected}
										// biome-ignore lint: 커스텀 UI 사용을 위한 ARIA role 사용
										role='option'
										tabIndex={0}
									>
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
									</button>
								);
							})
						)}
					</div>
				</div>
			)}
		</div>
	);
}
