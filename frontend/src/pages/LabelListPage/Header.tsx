import PlusIcon from '@/assets/plus.svg?react';
import { Button } from '@/shared/ui/button';
import { NavigationButton } from '@/widgets/LabelMilestoneTabs';
interface HeaderProps {
	onOpen: () => void;
}

export const Header = ({ onOpen }: HeaderProps) => {
	return (
		<div className='flex justify-between'>
			<NavigationButton />
			<Button variant='contained' size='sm' onClick={onOpen}>
				<PlusIcon className='size-4' />
				레이블 추가
			</Button>
		</div>
	);
};
