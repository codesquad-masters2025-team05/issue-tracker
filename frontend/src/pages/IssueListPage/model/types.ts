export interface IssueListFilterState {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;

	stateId: number | null;
	setStateId: (Id: number | null) => void;

	assigneeId: number | null;
	setAssigneeId: (id: number | null) => void;

	labelIds: number[];
	setLabelIds: (ids: number[]) => void;

	milestoneId: number | null;
	setMilestoneId: (id: number | null) => void;

	authorId: number | null;
	setAuthorId: (id: number | null) => void;
}
