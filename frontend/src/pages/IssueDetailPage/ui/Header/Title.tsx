import ArchiveIcon from '@/assets/archive.svg?react';
import EditIcon from '@/assets/edit.svg?react';
import XSquareIcon from '@/assets/xSquare.svg?react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import type { OnUpdateIssue } from '../..';

interface TitleProps {
	title: string;
	id: number;
	onEditComplete: OnUpdateIssue;
	onCloseIssue: () => void;
}

export function Title({ title, id, onEditComplete, onCloseIssue }: TitleProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(title);

	// 편집모드 진입시 초기화
	const handleStartEdit = () => {
		setEditTitle(title);
		setIsEditing(true);
	};

	// 편집모드 종료
	const handleCancel = () => {
		setIsEditing(false);
		setEditTitle(title);
	};

	// 편집 완료
	const handleComplete = () => {
		if (editTitle.trim() && editTitle !== title) {
			onEditComplete({ title: editTitle });
		}
		setIsEditing(false);
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
						<Button onClick={onCloseIssue} variant='outline' size='sm'>
							<ArchiveIcon />
							이슈 닫기
						</Button>
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
		</div>
	);
}
