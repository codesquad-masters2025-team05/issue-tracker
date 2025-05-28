export interface DropdownOption {
	id: number;
	avatar?: React.ReactNode;
	display: string;
	isSelected: boolean;
	onClick: () => void;
}
