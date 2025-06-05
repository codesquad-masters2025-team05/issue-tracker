import type { DropdownOption } from '@/shared/ui/Dropdown/DropdownOption';
import type { IssueMilestoneOptionApiDto } from './milestoneFilter.types';

export function parseMilestoneOptionToDropdownOption(
	milestone: IssueMilestoneOptionApiDto,
): DropdownOption {
	return {
		id: milestone.id,
		display: milestone.name,
	};
}
