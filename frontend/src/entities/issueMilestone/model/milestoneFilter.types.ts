export interface IssueMilestoneOptionApiDto {
	id: number;
	name: string;
}

export interface IssueMilestoneOptionsResponseDto {
	success: boolean;
	data: {
		total: number;
		page: number;
		perPage: number;
		milestones: IssueMilestoneOptionApiDto[];
	};
	error: string | null;
}

export interface IssueMilestoneOption {
	id: number;
	name: string;
}
