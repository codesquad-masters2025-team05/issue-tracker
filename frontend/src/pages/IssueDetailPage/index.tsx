import PlusIcon from '@/assets/plus.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useCreateComment } from '@/entities/comment/hooks/useCreateComment';
import { useUpdateComment } from '@/entities/comment/hooks/useUpdateComment';
import { useDeleteIssue } from '@/entities/issue/hooks/useDeleteIssue';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useFetchIssueList } from '@/entities/issue/hooks/useFetchIssueList';
import type { IssueUpdateRequest } from '@/entities/issue/model/issue.types';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { TextArea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/button';
import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from './ui/Comment';
import { Header } from './ui/Header';
import { Sidebar } from './ui/Sidebar';

export type OnUpdateIssue = (payload: IssueUpdateRequest) => void;

function Division() {
	return <div className='border-t border-[var(--neutral-border-default)]' />;
}

const IssueDetailPage: FC = () => {
	const [openConfirm, setOpenConfirm] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { refetch: issuesRefetch } = useFetchIssueList('');
	const { data: issue, refetch: issueDetailRefetch } = useFetchIssueDetail(
		Number(id),
	);
	const { mutate: commentUpdateMutate } = useUpdateComment(issueDetailRefetch);
	const { mutate: commentCreateMutate } = useCreateComment(() => {
		issueDetailRefetch();
		setInputValue('');
	});
	const { mutate: issueDeleteMutate } = useDeleteIssue(() => issuesRefetch());

	const [inputValue, setInputValue] = useState('');

	const isEnabled = inputValue.trim().length > 0;

	if (!issue) return;

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

	const onDeleteIssue = () => issueDeleteMutate(Number(id));

	return (
		<div className='flex flex-col gap-6'>
			{/** Title, Buttons, Information */}
			<Header />
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
							resourceType='comment'
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
						onClick={() => setOpenConfirm(true)}
					>
						<TrashIcon className='size-4' />
						이슈 삭제
					</Button>
				</div>
			</div>
			<ConfirmModal
				open={openConfirm}
				text='정말 이 이슈를 삭제하시겠습니까?'
				confirmText='삭제'
				cancelText='취소'
				onConfirm={() => {
					setOpenConfirm(false);
					onDeleteIssue();
				}}
				onCancel={() => setOpenConfirm(false)}
				isDanger
			/>
		</div>
	);
};

export default IssueDetailPage;
