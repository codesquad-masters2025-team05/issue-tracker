import EditIcon from '@/assets/edit.svg?react';
import GripIcon from '@/assets/grip.svg?react';
import SmileIcon from '@/assets/smile.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { fetchPresignedUrl } from '@/shared/api/presignedAPI';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { useUpdateComment } from '@/entities/comment/hooks/useUpdateComment';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { FileAttachButton } from '@/shared/ui/TextArea';
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
	const [uploading, setUploading] = useState(false);
	const [fileName, setFileName] = useState<string | undefined>();

	const hasChanged = editValue !== content && editValue.trim().length > 0;

	const { refetch: issueDetailRefetch } = useFetchIssueDetail(Number(issueId));
	const { mutate: commentUpdateMutate } = useUpdateComment(() => {
		issueDetailRefetch();
		toast.success('코멘트를 수정했습니다.');
	});

	// "입력 글자수" 카운터 노출 관리
	const [showCounter, setShowCounter] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditValue(e.target.value);
		setShowCounter(true);
		// 기존 타이머 있으면 제거
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setShowCounter(false), 3000);
	};

	// 언마운트시 타이머 해제
	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const onUpdateContent = () =>
		commentUpdateMutate({
			commentId: commentId,
			payload: { content: editValue },
		});

	// 파일 업로드 핸들러
	const handleFileUpload = async (file: File) => {
		if (file.size > 5 * 1024 * 1024) {
			alert('5MB 이하 이미지만 업로드 가능합니다.');
			return;
		}
		setFileName(file.name);
		setUploading(true);
		try {
			const { uploadUrl, accessUrl } = await fetchPresignedUrl({
				filename: file.name,
				type: 'comment', // 필요에 따라 resourceType 변경
				size: file.size,
			});

			const res = await fetch(uploadUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type,
				},
				body: file,
			});
			if (!res.ok) throw new Error('S3 업로드 실패');

			const imageMarkdown = `![image](${encodeURI(accessUrl)})`;
			setEditValue((prev) =>
				prev ? `${prev}\n${imageMarkdown}` : imageMarkdown,
			);
		} catch (e) {
			alert('파일 업로드에 실패했습니다.');
		} finally {
			setUploading(false);
			setFileName(undefined);
		}
	};

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
						<div>
							<CommentTextarea value={editValue} onChange={handleValueChange} />
							{/* 파일 첨부 버튼(실제 동작) */}
							<div className='flex flex-row items-center justify-end p-4 gap-2 h-13  relative'>
								{/* 오른쪽 하단에 카운터 표시 */}
								{showCounter && (
									<span
										className='
              absolute bottom-4.5 right-11
              font-available-medium-12 text-[var(--neutral-text-weak)]
              transition-opacity duration-300
            '
									>
										띄어쓰기 포함 {editValue.length}자
									</span>
								)}
								<GripIcon className='size-5 text-[var(--neutral-text-weak)]' />
							</div>
							<DashDivision />
							<FileAttachButton
								onFileSelect={handleFileUpload}
								id={'commentId-file'}
								disabled={uploading}
								fileName={fileName}
							/>
						</div>
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
		<div className='px-6 pt-4 pb-4'>
			<TextareaAutosize
				className='w-full font-display-medium-16 border-none outline-none resize-none'
				value={value}
				onChange={(e) => onChange(e)}
			/>
		</div>
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

const DashDivision = () => (
	<div className='border-t border-dashed border-[var(--neutral-border-default)]' />
);
