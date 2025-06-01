import ArchiveIcon from '@/assets/archive.svg?react';
import EditIcon from '@/assets/edit.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { useFetchIssueDetail } from '@/entities/issue/hooks/useFetchIssueDetail';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import type { OnUpdateIssue } from '../..';

interface TitleProps {
	title: string;
	id: number;
	onEditComplete: OnUpdateIssue;
}

export function Title({ title, id, onEditComplete }: TitleProps) {
	const { data: issue, refetch: issueDetailRefetch } = useFetchIssueDetail(
		Number(id),
	);
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(title);
	const [isModalOpen, setModalOpen] = useState(false);

	const handleStartEdit = () => {
		setEditTitle(title);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditTitle(title);
	};

	const handleComplete = () => {
		if (editTitle.trim() && editTitle !== title) {
			onEditComplete({ title: editTitle });
		}
		setIsEditing(false);
	};

	// 이슈 닫기
	const handleCloseIssue = async () => {
		setModalOpen(false);
		await onEditComplete({ isOpen: false });
		issueDetailRefetch();
	};

	// 이슈 다시 열기
	const handleReopenIssue = async () => {
		await onEditComplete({ isOpen: true });
		issueDetailRefetch();
	};

	return (
		<div className='flex items-center justify-between gap-4'>
			<div className='flex items-center h-12 w-full'>
				{!isEditing ? (
					<div className='flex gap-2 w-fit'>
						<span className='font-display-bold-32 text-[var(--neutral-text-strong)]'>
							{title}
						</span>
						<span className='font-display-bold-32 text-[var(--neutral-text-weak)]'>
							#{id}
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
						{issue?.isOpen ? (
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
							disabled={editTitle.trim() === '' || editTitle === title}
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
