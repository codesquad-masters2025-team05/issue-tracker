import type { User } from '@/entities/issue/model/issueDetail.read.types';

export interface CommentProps {
	id: number;
	isAuthor: boolean;
	content: string;
	commentAuthor: User;
	createdAt: string;
	updatedAt: string;
}

export interface CommentAvatarProps {
	imageUrl: string;
	name: string;
}

export interface CommentMetaProps {
	name: string;
	createdAt: string;
}

export interface EditingButtonProps {
	setEditing: () => void;
}

export interface CommentContentProps {
	content: string;
}

export interface CommentTextareaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface CommentActionsProps {
	onCancel: () => void;
	onSave: () => void;
	canSave: boolean;
}
