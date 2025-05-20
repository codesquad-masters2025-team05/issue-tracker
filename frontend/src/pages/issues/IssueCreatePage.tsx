import { IssueCreationForm } from '@/features/IssueCreation/Widget/sidebar/IssueCreationForm';
import { Input } from '@/shared/ui/Input';
import { TextArea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { type FC, useState } from 'react';

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

const IssueCreateModal: FC = () => {
	// 1. 제목 입력값
	const [title, setTitle] = useState('');

	// 2. 본문(코멘트) 입력값
	const [comment, setComment] = useState('');

	// 3. 파일 첨부 리스트
	const [files, setFiles] = useState<FileList | null>(null);

	// 4. 사이드바: 담당자, 레이블, 마일스톤 (이하 예시)
	const [assignee, setAssignee] = useState<number | null>(null); // 담당자 id
	const [labelIds, setLabelIds] = useState<number[]>([]); // 레이블 id 배열
	const [milestoneId, setMilestoneId] = useState<number | null>(null); // 마일스톤 id

	return (
		<div className='flex flex-col gap-6 mt-8 min-h-[818px]'>
			<span className='font-display-bold-32 text-[var(--neutral-text-strong)]'>
				새로운 이슈 작성
			</span>

			<Division />

			{/* 아바타, 입력, 사이드바 */}
			<div className='flex flex-row gap-6 flex-1'>
				<Avatar className='size-8'>
					<AvatarImage src={'123'} alt={'123'} />
					<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
				</Avatar>

				<div className='flex flex-col gap-2 flex-1'>
					<Input
						type='floating'
						placeholder='제목을 입력하세요'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextArea
						placeholder='코멘트 내용을 입력하세요'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						showCounter={true}
						onFileSelect={(files) => setFiles(files)}
					/>
				</div>

				<IssueCreationForm />
			</div>

			<Division />

			{/* 푸터 */}
			<div className='flex justify-end'>
				<Button>작성 취소</Button>
				<Button>완료</Button>
			</div>
		</div>
	);
};

export default IssueCreateModal;
