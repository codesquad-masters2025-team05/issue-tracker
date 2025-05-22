import SearchIcon from '@/assets/search.svg?react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from './IssueDropdown';

const options = [
	{ id: 0, display: '열린 이슈' },
	{ id: 1, display: '내가 작성한 이슈' },
	{ id: 2, display: '나에게 할당된 이슈' },
	{ id: 3, display: '내가 댓글을 남긴 이슈' },
	{ id: 4, display: '닫힌 이슈' },
];

export function FilterBar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get('q') ?? '';
	const [inputValue, setInputValue] = useState(q);

	// URL이 바뀔 때 input 값도 자동 동기화
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setInputValue(q);
	}, [q]);

	// 엔터 시에만 q 변경
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setSearchParams({ q: inputValue });
		}
	};
	return (
		<div className='w-140 flex border border-[var(--neutral-border-default)] rounded-2xl'>
			<Dropdown
				label='필터'
				panelLabel='이슈 필터'
				options={options}
				className='w-32 h-10 hover:bg-[var(--neutral-surface-bold)] rounded-l-2xl'
			/>
			<div className='border-r border-[var(--neutral-border-default)]' />
			<div className='w-full flex items-center gap-1 px-6 bg-[var(--neutral-surface-bold)] rounded-r-2xl'>
				<SearchIcon />
				<input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-full bg-transparent outline-none'
				/>
			</div>
		</div>
	);
}
