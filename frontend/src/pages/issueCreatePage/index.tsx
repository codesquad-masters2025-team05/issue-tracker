import { useCreateIssue } from '@/entities/issue/hooks/useCreateIssue';
import { Input } from '@/shared/ui/Input';
import { TextArea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';
import { useIssueCreateFormState } from './model/useIssueCreateFormState';
import { Sidebar } from './ui/Sidebar';

const Division = () => (
	<div className='border-t border-[var(--neutral-border-default)]' />
);

export default function IssueCreatePage() {
	const navigate = useNavigate();
	const form = useIssueCreateFormState();

	const { mutate } = useCreateIssue((issueId) => {
		navigate(`/issues/${issueId}`);
	});

	const handleSubmit = () => {
		mutate({
			title: form.title,
			comment: { content: form.content },
			assigneeIds: form.assigneeIds,
			labelIds: form.labelIds,
			milestoneId: form.milestoneId,
		});
	};

	return (
		<div className='flex flex-col gap-6 mt-8 min-h-[818px]'>
			<span className='font-display-bold-32 text-[var(--neutral-text-strong)]'>
				새로운 이슈 작성
			</span>
			<Division />

			<div className='flex flex-row gap-6 flex-1'>
				<Avatar className='size-8'>
					<AvatarImage src={'123'} alt={'123'} />
					<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
				</Avatar>

				<div className='flex flex-col gap-2 flex-1'>
					<Input
						type='floating'
						placeholder='제목을 입력하세요'
						value={form.title}
						onChange={(e) => form.setTitle(e.target.value)}
					/>
					<TextArea
						placeholder='코멘트 내용을 입력하세요'
						value={form.content}
						onChange={(e) => form.setContent(e.target.value)}
						showCounter={true}
						resourceType='issue'
					/>
				</div>

				<Sidebar
					assigneeIds={form.assigneeIds}
					setAssigneeIds={form.setAssigneeIds}
					labelIds={form.labelIds}
					setLabelIds={form.setLabelIds}
					milestoneId={form.milestoneId}
					setMilestoneId={form.setMilestoneId}
				/>
			</div>

			<Division />

			<div className='flex justify-end'>
				<Button variant='ghost' onClick={() => navigate(-1)}>
					작성 취소
				</Button>
				<Button
					onClick={handleSubmit}
					disabled={form.title.trim().length === 0}
				>
					완료
				</Button>
			</div>
		</div>
	);
}
