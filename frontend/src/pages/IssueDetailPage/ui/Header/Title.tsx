import ArchiveIcon from '@/assets/archive.svg?react';
import EditIcon from '@/assets/edit.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { useUpdateIssue } from '@/entities/issue/hooks/useUpdateIssue';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Title() {
	const { id } = useParams<{ id: string }>();
	const { data: issue, refetch: issueDetailRefetch } = useFetchIssueDetail(
		Number(id),
	);
	const { mutateAsync: updateIssueMutate } = useUpdateIssue(issueDetailRefetch);

	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(issue?.title ?? '');
	const [isModalOpen, setModalOpen] = useState(false);

	// 타이틀 동기화
	// (issue.title이 바뀌면, editTitle도 바꿔줌)
	useEffect(() => {
		setEditTitle(issue?.title ?? '');
	}, [issue?.title]);

	if (!issue) return null;

	const handleStartEdit = () => {
		setEditTitle(issue.title);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditTitle(issue.title);
	};

	const handleComplete = async () => {
		if (editTitle.trim() && editTitle !== issue.title) {
			await updateIssueMutate({ id: issue.id, payload: { title: editTitle } });
			await issueDetailRefetch();
		}
		setIsEditing(false);
	};

	const handleCloseIssue = async () => {
		setModalOpen(false);
		await updateIssueMutate({ id: issue.id, payload: { isOpen: false } });
		await issueDetailRefetch();
	};

	const handleReopenIssue = async () => {
		await updateIssueMutate({ id: issue.id, payload: { isOpen: true } });
		await issueDetailRefetch();
	};

	return (
		<div className='flex items-center justify-between gap-4'>
			<div className='flex items-center h-12 w-full'>
				{!isEditing ? (
					<div className='flex gap-2 w-fit'>
						<span className='font-display-bold-32 text-[var(--neutral-text-strong)]'>
							{issue.title}
						</span>
						<span className='font-display-bold-32 text-[var(--neutral-text-weak)]'>
							#{issue.id}
						</span>
					</div>
				) : (
					<Input
						type='basic'
						value={editTitle}
						fixedValue='제목'
						placeholder='제목을 입력하세요'
						onChange={(e) => setEditTitle(e.target.value)}
					/>
				)}
			</div>
			<div className='flex items-center gap-4'>
				{!isEditing ? (
					<>
						<Button onClick={handleStartEdit} variant='outline' size='sm'>
							<EditIcon />
							제목 편집
						</Button>
						{issue.isOpen ? (
							<Button
								onClick={() => setModalOpen(true)}
								variant='outline'
								size='sm'
							>
								<ArchiveIcon />
								이슈 닫기
							</Button>
						) : (
							<Button onClick={handleReopenIssue} variant='outline' size='sm'>
								<ArchiveIcon />
								다시 열기
							</Button>
						)}
					</>
				) : (
					<>
						<Button onClick={handleCancel} variant='outline' size='sm'>
							<XSquareIcon />
							편집 취소
						</Button>
						<Button
							onClick={handleComplete}
							size='sm'
							disabled={editTitle.trim() === '' || editTitle === issue.title}
						>
							<EditIcon />
							편집 완료
						</Button>
					</>
				)}
			</div>
			<ConfirmModal
				open={isModalOpen}
				text='이슈를 정말로 닫으시겠습니까?'
				confirmText='이슈 닫기'
				cancelText='취소'
				isDanger
				onConfirm={handleCloseIssue}
				onCancel={() => setModalOpen(false)}
			/>
		</div>
	);
}
