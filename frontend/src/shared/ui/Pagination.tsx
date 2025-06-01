interface PaginationProps {
	totalCount: number;
	page: number;
	perPage: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	totalCount,
	page,
	perPage,
	onPageChange,
}: PaginationProps) {
	const pageCount = Math.max(1, Math.ceil(totalCount / perPage));
	if (pageCount <= 1) return null;

	const getPageNumbers = () => {
		const arr: number[] = [];
		if (pageCount <= 5) {
			for (let i = 1; i <= pageCount; i++) arr.push(i);
		} else {
			if (page <= 3) arr.push(1, 2, 3, 4, -1, pageCount);
			else if (page >= pageCount - 2)
				arr.push(1, -1, pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
			else arr.push(1, -1, page - 1, page, page + 1, -1, pageCount);
		}
		return arr;
	};

	return (
		<nav aria-label='pagination' className='flex justify-center mt-8'>
			<ul className='flex items-center gap-2'>
				<li>
					<button
						type='button'
						className='min-w-9 min-h-9 rounded-[12px] px-3 border border-[var(--color-grayscale-300)] bg-[var(--color-grayscale-50)] text-[var(--color-grayscale-700)] font-available-medium-16 hover:bg-[var(--color-grayscale-100)] transition'
						disabled={page <= 1}
						aria-label='이전 페이지'
						onClick={() => page > 1 && onPageChange(page - 1)}
					>
						&lt;
					</button>
				</li>
				{getPageNumbers().map((num, idx) =>
					num === -1 ? (
						<li key={`ellipsis-${idx === 1 ? 'left' : 'right'}`}>
							<span
								className='min-w-9 min-h-9 flex items-center justify-center text-[var(--color-grayscale-500)]'
								aria-hidden
								tabIndex={-1}
							>
								…
							</span>
						</li>
					) : (
						<li key={num}>
							<button
								type='button'
								className={`min-w-9 min-h-9 rounded-[12px] px-3 border font-available-medium-16 transition ${
									num === page
										? 'border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] bg-[var(--color-grayscale-100)] pointer-events-none'
										: 'border-[var(--color-grayscale-300)] text-[var(--color-grayscale-700)] bg-[var(--color-grayscale-50)] hover:bg-[var(--color-grayscale-100)]'
								}`}
								aria-current={num === page ? 'page' : undefined}
								disabled={num === page}
								tabIndex={num === page ? -1 : 0}
								onClick={() => onPageChange(num)}
							>
								{num}
							</button>
						</li>
					),
				)}
				<li>
					<button
						type='button'
						className='min-w-9 min-h-9 rounded-[12px] px-3 border border-[var(--color-grayscale-300)] bg-[var(--color-grayscale-50)] text-[var(--color-grayscale-700)] font-available-medium-16 hover:bg-[var(--color-grayscale-100)] transition'
						disabled={page >= pageCount}
						aria-label='다음 페이지'
						onClick={() => page < pageCount && onPageChange(page + 1)}
					>
						&gt;
					</button>
				</li>
			</ul>
		</nav>
	);
}
