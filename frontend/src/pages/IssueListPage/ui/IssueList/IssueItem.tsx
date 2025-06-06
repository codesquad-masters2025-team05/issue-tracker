import Archive from '@/assets/archive.svg?react';
import IconInfo from '@/assets/icon_info.svg?react';
import IconMilestone from '@/assets/milestone.svg?react';
import type { IssueListItem } from '@/entities/issue/model/issue.read.types';
import { LabelChip } from '@/shared/ui/LabelChip';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { Checkbox } from './CheckBox';

interface IssueItemProps {
	issue: IssueListItem;
	onClickIssue: () => void;
}

export function IssueItem({ issue, onClickIssue }: IssueItemProps) {
	const when = formatDistanceToNow(new Date(issue.createdAt), {
		addSuffix: true,
		locale: ko,
	}); // e.g. "8분 전"

	return (
		<div className='flex w-full items-center py-4'>
			{/* 1. 체크박스 영역 */}
			<div className='flex-none px-8 h-8 flex items-center'>
				<Checkbox />
			</div>

			{/* 2. 정보 영역 */}
			<button
				type='button'
				className='group flex-1 flex flex-col justify-center gap-2 cursor-pointer'
				onClick={onClickIssue}
			>
				{/* 첫 번째 줄: 아이콘, 제목, 라벨 */}
				<div className='flex items-center gap-2'>
					<div className='text--[var(--brand-text-weak)]'>
						{issue.isOpen ? (
							<IconInfo className='text-[var(--brand-text-weak)]' />
						) : (
							<Archive className='text-[var(--brand-text-weak)]' />
						)}
					</div>
					<span className='font-available-medium-20 text-[var(--neutral-text-strong)] group-hover:underline'>
						{issue.title}
					</span>
					{issue.labels.map((label) => (
						<LabelChip
							key={label.id}
							id={label.id}
							name={label.name}
							textColor={label.textColor}
							backgroundColor={label.backgroundColor}
						/>
					))}
				</div>

				{/* 두 번째 줄: 메타 정보 */}
				<div className='flex flex-wrap items-center gap-4 font-display-medium-16 text-[var(--neutral-text-weak)]'>
					<span>#{issue.id}</span>
					<span>
						{when}, {issue.author.username}님에 의해 작성되었습니다
					</span>
					{issue.milestone && (
						<span className='flex items-center gap-1'>
							<IconMilestone />
							<span>{issue.milestone.name}</span>
						</span>
					)}
				</div>
			</button>

			<div className='flex mx-[54px]'>
				{issue.assignees.map((assignee, i) => (
					<Avatar
						key={assignee.id}
						className={`size-5 ${i > 0 ? '-ml-2' : ''} border-2 border-white`}
					>
						<AvatarImage src={assignee.imageUrl} alt={assignee.username} />
						<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
					</Avatar>
				))}
			</div>
		</div>
	);
}
