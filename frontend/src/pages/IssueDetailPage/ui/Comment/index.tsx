import EditIcon from '@/assets/edit.svg?react';
import PaperCilpIcon from '@/assets/paperclip.svg?react';
import SmileIcon from '@/assets/smile.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import type { Attachment, User } from '@/entities/issue/model/issue.types';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useMemo, useState } from 'react';

interface CommentProps {
	id: number;
	isAuthor: boolean;
	content: string;
	initialFiles: Attachment[];
	commentAuthor: User;
	createdAt: string;
	updatedAt: string;
	onSave: (id: number, value: string) => void;
}

export function Comment({
	id,
	isAuthor,
	content,
	initialFiles,
	commentAuthor,
	createdAt,
	updatedAt,
	onSave,
}: CommentProps) {
	const [editing, setEditing] = useState(false);
	const [editValue, setEditValue] = useState(content);
	const [files, setFiles] = useState<Attachment[]>(initialFiles);

	const filesAreDifferent = (a: Attachment[], b: Attachment[]) => {
		if (a.length !== b.length) return true;
		// 순서까지 비교. (순서 상관없게 하려면 sort 후 비교)
		return a.some((file, i) => file.url !== b[i]?.url);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: filesAreDifferent is a pure function defined inline and does not need to be in deps.
	const hasChanged = useMemo(
		() =>
			(editValue !== content && editValue.trim().length > 0) ||
			filesAreDifferent(files, initialFiles),
		[editValue, content, files, initialFiles],
	);

	return (
		<div>
			<div
				className={`flex flex-col rounded-[16px] bg-[var(--neutral-surface-strong)] border
        ${editing ? 'border-[var(--neutral-border-active)]' : 'border-[var(--neutral-border-default)]'}`}
			>
				{/** 코멘트 메타정보, 버튼 부분 */}
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

				{/** 콘텐츠 부분 */}
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
						<DemoFileInput baseId={id} />
					</>
				)}
			</div>
			{/** 액션 버튼 */}
			{editing && (
				<CommentActions
					onCancel={() => setEditing(false)}
					onSave={() => onSave(id, editValue)}
					canSave={hasChanged}
				/>
			)}
		</div>
	);
}

interface CommentAvatarProps {
	imageUrl: string;
	name: string;
}

export function CommentAvatar({ imageUrl, name }: CommentAvatarProps) {
	return (
		<Avatar className='size-8'>
			<AvatarImage src={imageUrl} alt={name} />
			<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
		</Avatar>
	);
}

interface CommentMetaProps {
	name: string;
	createdAt: string;
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

interface EditingButtonProps {
	setEditing: () => void;
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

interface CommentContentProps {
	content: string;
}

export function CommentContent({ content }: CommentContentProps) {
	return (
		<div className='whitespace-pre-wrap font-display-medium-16 text-[var(--neutral-text-default)]'>
			{content}
		</div>
	);
}

interface CommentTextareaProps {
	value: string;
	onChange: (value: string) => void;
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

interface CommentActionsProps {
	onCancel: () => void;
	onSave: () => void;
	canSave: boolean;
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
