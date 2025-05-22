import { useIssueLabelOptions } from '@/entities/issueLabel/hooks/useIssueLabelOptions';
import { parseLabelOptionToDropdownOption } from '@/entities/issueLabel/model/parseToDropdownOption';
import { useIssueMilestoneOptions } from '@/entities/issueMilestone/hooks/useIssueMilestoneOptions';
import { parseMilestoneOptionToDropdownOption } from '@/entities/issueMilestone/model/parseToDropdownOption';
import { useAuthorList } from '@/entities/user/hooks/useAuthorList';
import { useUserList } from '@/entities/user/hooks/useUserList';
import {
	parseAuthorToDropdownOption,
	parseUserToDropdownOption,
} from '@/entities/user/model/parseToDropdownOption';

export function useISsueFilterOptions() {
	const {
		data: labelData,
		isLoading: labelLoading,
		isError: labelError,
	} = useIssueLabelOptions();
	const {
		data: milestoneData,
		isLoading: milestoneLoading,
		isError: milestoneError,
	} = useIssueMilestoneOptions();
	const {
		data: userData,
		isLoading: userLoading,
		isError: userError,
	} = useUserList();
	const {
		data: authorData,
		isLoading: authorLoading,
		isError: authorError,
	} = useAuthorList();

	const labelOptions =
		labelData?.labels.map(parseLabelOptionToDropdownOption) ?? [];
	const milestoneOptions =
		milestoneData?.milestones.map(parseMilestoneOptionToDropdownOption) ?? [];
	const userOptions = userData?.users.map(parseUserToDropdownOption) ?? [];
	const authorOptions =
		authorData?.users.map(parseAuthorToDropdownOption) ?? [];

	return {
		labelOptions,
		milestoneOptions,
		userOptions,
		authorOptions,
		labelLoading,
		milestoneLoading,
		userLoading,
		authorLoading,
		labelError,
		milestoneError,
		userError,
		authorError,
	};
}
