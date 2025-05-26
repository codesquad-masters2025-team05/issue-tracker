import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useUpdateIssue } from '@/entities/issue/hooks/useUpdateIssue';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { mockIssue } from './mock';
import { Header } from './ui/Header';

/*
export interface IssueDetailResponse {
	id: number;
	title: string;
	open: boolean;
	labels: Label[];
	author: User;
	assignees: User[];
	milestone: MilestoneDetail | null;
	createdAt: string;
	updatedAt: string;
	comments: Comment[];
}
*/

const IssueDetailPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data } = useFetchIssueDetail(Number(id));
	const { mutate } = useUpdateIssue();
	const issue = data ? data : mockIssue;

	const toggleOpen = () =>
		mutate({
			id: issue.id,
			payload: { open: !issue.open },
		});

	const onEditComplete = (title: string) =>
		mutate({
			id: issue.id,
			payload: { title: title },
		});

	return (
		<div className='flex flex-col gap-6'>
			<Header
				title={issue.title}
				id={issue.id}
				onCloseIssue={toggleOpen}
				onEditComplete={onEditComplete}
				open={issue.open}
				author={issue.author}
				createdAt={issue.createdAt}
				commentCount={issue.comments.length}
			/>
			<Division />
		</div>
	);
};

export default IssueDetailPage;

function Division() {
	return <div className='border-t border-[var(--neutral-border-default)]' />;
}
