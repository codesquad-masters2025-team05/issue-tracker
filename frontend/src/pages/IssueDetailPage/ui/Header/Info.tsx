import AlertCircleIcon from '@/assets/alertCircle.svg?react';
import ArchiveIcon from '@/assets/archive.svg?react';
import type { User } from '@/entities/issue/model/issue.types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

export interface InfoProps {
	open: boolean;
	author: User;
	createdAt: string;
	commentCount: number;
}
export function Info({ open, author, createdAt, commentCount }: InfoProps) {
	return (
		<div className='flex items-center gap-2'>
			<Tag open={open} />
			<Text name={author.username} createdAt={createdAt} />
			<span>·</span>
			<CommentCount commentCount={commentCount} />
		</div>
	);
}

function Tag({ open }: { open: boolean }) {
	return (
		<div className='h-8 rounded-2xl flex items-center px-4 bg-[var(--palette-blue)] text-[var(--brand-text-default)] font-display-medium-12'>
			{open ? (
				<>
					<AlertCircleIcon className='size-4' />
					<span className='px-1'>열린 이슈</span>
				</>
			) : (
				<>
					<ArchiveIcon className='size-4' />
					<span className='px-1'>닫힌 이슈</span>
				</>
			)}
		</div>
	);
}

function Text({ name, createdAt }: { name: string; createdAt: string }) {
	const when = formatDistanceToNow(new Date(createdAt), {
		addSuffix: true,
		locale: ko,
	}); // e.g. "8분 전"

	return (
		<span className='font-display-medium-16 text-[var(--neutral-text-weak)]'>{`이 이슈가 ${when}에 ${name}님에 의해 열렸습니다`}</span>
	);
}

function CommentCount({ commentCount }: { commentCount: number }) {
	return (
		<span className='font-display-medium-16 text-[var(--neutral-text-weak)]'>{`코멘트 ${commentCount}개`}</span>
	);
}
