import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface OptionAvatarLabelProps {
	imageUrl?: string;
	text: string;
	className?: string;
	avatarClassName?: string; // 필요시 아바타만 따로 스타일
}

export const OptionAvatarLabel: React.FC<OptionAvatarLabelProps> = ({
	imageUrl,
	text,
	className,
	avatarClassName,
}) => {
	return (
		<div className={`flex items-center gap-2 ${className ?? ''}`}>
			<Avatar className={avatarClassName ?? 'size-5'}>
				<AvatarImage src={imageUrl} alt={text} />
				<AvatarFallback className='bg-[var(--neutral-surface-bold)]' />
			</Avatar>
			<span>{text}</span>
		</div>
	);
};
