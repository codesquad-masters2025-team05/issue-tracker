import PlusIcon from '@/assets/plus.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useCreateComment } from '@/entities/comment/hooks/useCreateComment';
import { useUpdateComment } from '@/entities/comment/hooks/useUpdateComment';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useUpdateIssue } from '@/entities/issue/hooks/useUpdateIssue';
import type { IssueUpdateRequest } from '@/entities/issue/model/issue.types';
import { TextArea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/button';
import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockIssue } from './mock';
import { Comment } from './ui/Comment';
import { Header } from './ui/Header';
import { Sidebar } from './ui/Sidebar';

export type OnUpdateIssue = (payload: IssueUpdateRequest) => void;

function Division() {
	return <div className='border-t border-[var(--neutral-border-default)]' />;
}

const IssueDetailPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data, refetch } = useFetchIssueDetail(Number(id));
	const { mutate: issueUpdateMutate } = useUpdateIssue(refetch);
	const { mutate: commentUpdateMutate } = useUpdateComment(refetch);
	const { mutate: commentCreateMutate } = useCreateComment(() => {
		refetch();
		setInputValue('');
	});
	const issue = data ? data : mockIssue;

	const [inputValue, setInputValue] = useState('');

	const isEnabled = inputValue.trim().length > 0;

	const toggleOpen = () =>
		issueUpdateMutate({
			id: issue.id,
			payload: { isOpen: !issue.isOpen },
		});

	const onUpdateIssue = (payload: IssueUpdateRequest) =>
		issueUpdateMutate({
			id: issue.id,
			payload,
		});

	const onUpdateContent = (id: number, content: string) =>
		commentUpdateMutate({
			commentId: id,
			payload: { content: content },
		});

	const onCreateContent = () =>
		commentCreateMutate({
			issueId: Number(id),
			payload: { content: inputValue },
		});

	return (
		<div className='flex flex-col gap-6'>
			{/** Title, Buttons, Information */}
			<Header
				title={issue.title}
				id={issue.id}
				onCloseIssue={toggleOpen}
				onEditComplete={onUpdateIssue}
				open={issue.isOpen}
				author={issue.author}
				createdAt={issue.createdAt}
				commentCount={issue.comments?.length}
			/>
			{/** Division */}
			<Division />
			<div className='flex gap-8'>
				{/** Comment, TextArea, CreateButton */}
				<div className='flex flex-1 flex-col gap-6'>
					{issue.comments?.map((comment) => {
						return (
							<Comment
								key={comment.id}
								id={comment.id}
								isAuthor={issue.author.id === comment.author.id}
								content={comment.content || ''}
								commentAuthor={comment.author}
								createdAt={comment.createdAt}
								updatedAt={comment.updatedAt}
								onSave={(id, content) => onUpdateContent(id, content)}
							/>
						);
					})}
					{/** TextArea, CreateButton */}
					<div className='flex flex-col gap-6'>
						<TextArea
							label='코멘트를 입력하세요'
							placeholder='코멘트를 입력하세요'
							id={id}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							showCounter={true}
						/>
						<div className='flex justify-end'>
							<Button
								variant='contained'
								size='sm'
								onClick={onCreateContent}
								disabled={!isEnabled}
							>
								<PlusIcon />
								코멘트 작성
							</Button>
						</div>
					</div>
				</div>
				{/** Sidebar */}
				<div className='flex flex-col items-end gap-4'>
					<Sidebar />
					<Button
						variant='ghost'
						size='sm'
						className='text-[var(--danger-text-default)]'
					>
						<TrashIcon className='size-4' />
						이슈 삭제
					</Button>
				</div>
			</div>
		</div>
	);
};

export default IssueDetailPage;
