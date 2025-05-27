import type { OnUpdateIssue } from '../..';
import { Info, type InfoProps } from './Info';
import { Title } from './Title';

interface HeaderProps extends InfoProps {
	title: string;
	id: number;
	onEditComplete: OnUpdateIssue;
	onCloseIssue: () => void;
}

export function Header({
	title,
	id,
	onEditComplete,
	onCloseIssue,
	open,
	author,
	createdAt,
	commentCount,
}: HeaderProps) {
	return (
		<div className='flex flex-col mt-8 gap-4'>
			<Title
				title={title}
				id={id}
				onEditComplete={onEditComplete}
				onCloseIssue={onCloseIssue}
			/>
			<Info
				open={open}
				author={author}
				createdAt={createdAt}
				commentCount={commentCount}
			/>
		</div>
	);
}
