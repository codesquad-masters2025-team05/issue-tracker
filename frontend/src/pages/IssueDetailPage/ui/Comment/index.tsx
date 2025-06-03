import EditIcon from '@/assets/edit.svg?react';
import PaperCilpIcon from '@/assets/paperclip.svg?react';
import SmileIcon from '@/assets/smile.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { useUpdateComment } from '@/entities/comment/hooks/useUpdateComment';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type {
	CommentActionsProps,
	CommentAvatarProps,
	CommentContentProps,
	CommentMetaProps,
	CommentProps,
	CommentTextareaProps,
	EditingButtonProps,
} from './Comment.types';

export function Comment({
	id: commentId,
	isAuthor,
	content,
	commentAuthor,
	createdAt,
}: CommentProps) {
	const { id: issueId } = useParams<{ id: string }>();

	const [editing, setEditing] = useState(false);
	const [editValue, setEditValue] = useState(content);

	const hasChanged = editValue !== content && editValue.trim().length > 0;

	const { refetch: issueDetailRefetch } = useFetchIssueDetail(Number(issueId));
	const { mutate: commentUpdateMutate } = useUpdateComment(() => {
		issueDetailRefetch();
		toast.success('코멘트를 수정했습니다.');
	});

	const onUpdateContent = () =>
		commentUpdateMutate({
			commentId: commentId,
			payload: { content: editValue },
		});

	return (
		<div>
			<div
				className={`flex flex-col rounded-[16px] bg-[var(--neutral-surface-strong)] border
        ${editing ? 'border-[var(--neutral-border-active)]' : 'border-[var(--neutral-border-default)]'}`}
			>
				{/* 코멘트 메타정보, 버튼 부분 */}
				<div className='flex items-center justify-between gap-2 px-6 py-4 bg-[var(--neutral-surface-default)] rounded-t-2xl'>
					<div className='flex gap-2'>
						<CommentAvatar
							imageUrl={commentAuthor.imageUrl}
							name={commentAuthor.username}
						/>
						<CommentMeta name={commentAuthor.username} createdAt={createdAt} />
					</div>

					<div className='flex gap-4 items-center'>
						{isAuthor && <AuthorLabelChip />}
						<EditingButton setEditing={() => setEditing(!editing)} />
						<EmotionButton />
					</div>
				</div>

				<Division />

				{/* 콘텐츠 부분 */}
				{!editing ? (
					<div className='px-6 pt-4 pb-6'>
						<CommentContent content={content} />
					</div>
				) : (
					<>
						<div className='px-6 pt-4 pb-4'>
							<CommentTextarea value={editValue} onChange={setEditValue} />
						</div>
						<VerticalDashDivision />
						<DemoFileInput baseId={commentId} />
					</>
				)}
			</div>
			{/* 액션 버튼 */}
			{editing && (
				<CommentActions
					onCancel={() => setEditing(false)}
					onSave={() => {
						setEditing(false);
						onUpdateContent();
					}}
					canSave={hasChanged}
				/>
			)}
		</div>
	);
}

export function CommentAvatar({ imageUrl, name }: CommentAvatarProps) {
	return (
		<Avatar className='size-8'>
			<AvatarImage src={imageUrl} alt={name} />
			<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
		</Avatar>
	);
}

export function CommentMeta({ name, createdAt }: CommentMetaProps) {
	const when = formatDistanceToNow(new Date(createdAt), {
		addSuffix: true,
		locale: ko,
	});

	return (
		<div className='flex items-center gap-2'>
			<span className='font-display-medium-16 text-[var(--neutral-text-default)]'>
				{name}
			</span>
			<span className='font-display-medium-16 text-[var(--neutral-text-weak)]'>
				{when}
			</span>
		</div>
	);
}

export function AuthorLabelChip() {
	return (
		<LabelChip
			name='작성자'
			textColor='var(--neutral-text-weak)'
			backgroundColor='var(--neutral-surface-bold)'
		/>
	);
}

function EditingButton({ setEditing }: EditingButtonProps) {
	return (
		<button
			type='button'
			onClick={setEditing}
			className='flex items-center gap-1'
		>
			<EditIcon className='size-4' />
			<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
				편집
			</span>
		</button>
	);
}

function EmotionButton() {
	return (
		<button type='button' className='flex items-center gap-1'>
			<SmileIcon className='size-4' />
			<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
				반응
			</span>
		</button>
	);
}

export function CommentContent({ content }: CommentContentProps) {
	return (
		<div className='prose whitespace-pre-wrap font-display-medium-16 text-[var(--neutral-text-default)]'>
			<ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
				{content}
			</ReactMarkdown>
		</div>
	);
}

export function CommentTextarea({ value, onChange }: CommentTextareaProps) {
	return (
		<textarea
			className='w-full font-display-medium-16 border-none outline-none'
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}

export function CommentActions({
	onCancel,
	onSave,
	canSave,
}: CommentActionsProps) {
	return (
		<div className='flex justify-end gap-4 mt-6'>
			<Button size='sm' variant='outline' onClick={onCancel}>
				<XSquareIcon className='size-4' />
				편집 취소
			</Button>
			<Button
				size='sm'
				variant='contained'
				onClick={onSave}
				disabled={!canSave}
			>
				<EditIcon className='size-4' />
				편집 완료
			</Button>
		</div>
	);
}

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const VerticalDashDivision = () => (
	<div className='border-t border-dashed border-[var(--neutral-border-default)]' />
);

/**
 * 임시 컴포넌트임.
 * 실제 동작은 shared/ImageInput.tsx 를 써야 함
 */
function DemoFileInput({ baseId }: { baseId: number }) {
	return (
		<>
			<input id={`${baseId}-file`} type='file' className='hidden' />
			<label
				htmlFor={`${baseId}-file`}
				className='flex items-center px-4 h-13 cursor-pointer select-none'
			>
				<PaperCilpIcon className='size-4' />
				<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
					파일 첨부하기
				</span>
			</label>
		</>
	);
}
