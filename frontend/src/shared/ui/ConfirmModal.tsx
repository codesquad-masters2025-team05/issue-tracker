interface ConfirmModalProps {
	open: boolean;
	text: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	isDanger?: boolean; // 오른쪽 버튼이 삭제 등 위험 액션일 때 색상
}

/**
 * 디자인 시스템 기반 ConfirmModal (FSD: shared/ui)
 */
export const ConfirmModal = ({
	open,
	text,
	confirmText = '확인',
	cancelText = '취소',
	onConfirm,
	onCancel,
	isDanger = false,
}: ConfirmModalProps) => {
	if (!open) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
			<div
				className='bg-[var(--neutral-surface-strong)]'
				style={{
					width: 424,
					minHeight: 180,
					maxHeight: 252,
					borderRadius: 'var(--radius-large)',
					border: '1px solid var(--neutral-border-default)',
					boxShadow: '0 0 8px rgba(20,20,43,0.04)',
					padding: 32,
					gap: 24,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<div className='font-display-medium-16 text-[var(--neutral-text-default)]'>
					{text}
				</div>
				<div className='flex justify-center gap-4 mt-4'>
					{/* LEFT BUTTON - outline */}
					<button
						type='button'
						className='w-[176px] h-10 rounded-[var(--radius-large)] border border-[var(--brand-border-default)] font-available-medium-16 text-[var(--brand-border-default)] bg-transparent transition hover:bg-[var(--brand-surface-default)] hover:text-[var(--neutral-surface-strong)]'
						onClick={onCancel}
					>
						{cancelText}
					</button>
					{/* RIGHT BUTTON - contained or danger */}
					<button
						type='button'
						className={`w-[176px] h-10 rounded-[var(--radius-large)] font-available-medium-16 text-white transition
              ${
								isDanger
									? 'bg-[var(--danger-surface-default)]'
									: 'bg-[var(--brand-surface-default)]'
							}
              hover:opacity-80`}
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};
