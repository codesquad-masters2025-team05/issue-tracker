export interface IssueLabelOption {
	id: number;
	name: string;
	backgroundColor: string;
	textColor: string;
}

interface LabelChipProps extends IssueLabelOption {
	className?: string;
}

export const LabelChip: React.FC<LabelChipProps> = ({
	name,
	backgroundColor,
	textColor,
	className,
}) => {
	const BRIGHT_COLORS = new Set([
		'#fff',
		'#FFF',
		'#ffffff',
		'#FFFFFF',
		'#fefefe',
		'#FEFEFE',
	]);

	const isBright = BRIGHT_COLORS.has(backgroundColor);

	return (
		<span
			className={`font-display-medium-12 px-3 py-1 rounded-2xl inline-block ${className ?? ''}`}
			style={{
				backgroundColor,
				color: textColor,
				borderColor: isBright ? 'var(--neutral-border-default)' : undefined,
				borderWidth: isBright ? '1px' : undefined,
				borderStyle: isBright ? 'solid' : undefined,
			}}
		>
			{name}
		</span>
	);
};
