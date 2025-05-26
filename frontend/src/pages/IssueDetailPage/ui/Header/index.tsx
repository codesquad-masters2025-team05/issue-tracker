import { Title } from './Title';

interface HeaderProps {
	title: string;
	id: number;
	onEditComplete: (title: string) => void;
	onCloseIssue: () => void;
}

export function Header({
	title,
	id,
	onEditComplete,
	onCloseIssue,
}: HeaderProps) {
	return (
		<div className='mt-8'>
			<Title
				title={title}
				id={id}
				onEditComplete={onEditComplete}
				onCloseIssue={onCloseIssue}
			/>
		</div>
	);
}
