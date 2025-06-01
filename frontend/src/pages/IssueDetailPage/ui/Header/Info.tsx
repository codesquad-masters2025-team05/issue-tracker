import AlertCircleIcon from '@/assets/alertCircle.svg?react';
import ArchiveIcon from '@/assets/archive.svg?react';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useParams } from 'react-router-dom';

export function Info() {
	const { id } = useParams<{ id: string }>();
	const { data: issue } = useFetchIssueDetail(Number(id));

	if (!issue) return null;

	const when = formatDistanceToNow(new Date(issue.createdAt), {
		addSuffix: true,
		locale: ko,
	});

	return (
		<div className='flex items-center gap-2'>
			<Tag open={issue.isOpen} />
			<span className='font-display-medium-16 text-[var(--neutral-text-weak)]'>
				{`이 이슈가 ${when}에 ${issue.author.username}님에 의해 열렸습니다`}
			</span>
			<span>·</span>
			<span className='font-display-medium-16 text-[var(--neutral-text-weak)]'>
				{`코멘트 ${issue.comments?.length ?? 0}개`}
			</span>
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
