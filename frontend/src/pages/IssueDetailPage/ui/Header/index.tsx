import { Info } from './Info';
import { Title } from './Title';

export function Header() {
	return (
		<div className='flex flex-col mt-8 gap-4'>
			<Title />
			<Info />
		</div>
	);
}
