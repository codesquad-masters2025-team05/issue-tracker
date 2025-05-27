import { useUpdateComment } from '@/entities/comment/hooks/useUpdateComment';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useUpdateIssue } from '@/entities/issue/hooks/useUpdateIssue';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { mockIssue } from './mock';
import { Comment } from './ui/Comment';
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
	const { mutate: commentMutate } = useUpdateComment();
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

	const onUpdateContent = (id: number, content: string) =>
		commentMutate({
			commentId: id,
			payload: { content: content },
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
			<div className='flex flex-col gap-6'>
				{issue.comments.map((comment) => {
					return (
						<Comment
							key={comment.id}
							id={comment.id}
							isAuthor={issue.author.id === comment.author.id}
							content={comment.content || ''}
							initialFiles={comment.attachments}
							commentAuthor={comment.author}
							createdAt={comment.createdAt}
							updatedAt={comment.updatedAt}
							onSave={(id, content) => onUpdateContent(id, content)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default IssueDetailPage;

function Division() {
	return <div className='border-t border-[var(--neutral-border-default)]' />;
}
