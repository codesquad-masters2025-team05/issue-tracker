import SearchIcon from '@/assets/search.svg?react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IssueFilterDropdown } from './IssueFilterDropdown';

const Division = () => (
	<div className='border-r border-[var(--neutral-border-default)]' />
);

export function FilterBar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get('q') ?? '';
	const [inputValue, setInputValue] = useState(q);

	useEffect(() => {
		setInputValue(q);
	}, [q]);

	// 엔터 시에만 q 변경
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setSearchParams({ q: inputValue || 'is:open' });
		}
	};
	return (
		<div
			className='group w-140 flex border border-[var(--neutral-border-default)] rounded-2xl
		focus-within:outline-[1px] focus-within:outline-[var(--brand-border-active)]'
		>
			<IssueFilterDropdown className='group-focus-within:bg-[var(--neutral-surface-strong)]' />
			<Division />
			<div
				className='w-full flex items-center gap-1 px-6 
				bg-[var(--neutral-surface-bold)] rounded-r-2xl focus-within:bg-[var(--neutral-surface-strong)]
				'
			>
				<SearchIcon />
				<input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='is:open'
					className='w-full outline-none'
				/>
			</div>
		</div>
	);
}
