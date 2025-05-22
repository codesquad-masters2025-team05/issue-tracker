import SearchIcon from '@/assets/search.svg?react';
import IssueDropdown from './IssueDropdown';

interface FilterBarProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	stateId: number | null;
	setStateId: (Id: number | null) => void;
}

export function FilterBar({
	isOpen,
	setIsOpen,
	stateId,
	setStateId,
}: FilterBarProps) {
	return (
		<div className='w-140 flex border border-[var(--neutral-border-default)] rounded-2xl'>
			<IssueDropdown
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				stateId={stateId}
				setStateId={setStateId}
				className='w-32 h-10 hover:bg-[var(--neutral-surface-bold)] rounded-l-2xl'
			/>
			<div className='border-r border-[var(--neutral-border-default)]' />
			<div className='w-full flex items-center gap-1 px-6 bg-[var(--neutral-surface-bold)] rounded-r-2xl'>
				<SearchIcon />
				<input value='is:issue is:open' className='' />
			</div>
		</div>
	);
}
