import { useIssueLabelOptions } from '@/entities/issueLabel/hooks/useIssueLabelOptions';
import { parseLabelOptionToDropdownOption } from '@/entities/issueLabel/model/parseToDropdownOption';
import { useIssueMilestoneOptions } from '@/entities/issueMilestone/hooks/useIssueMilestoneOptions';
import { parseMilestoneOptionToDropdownOption } from '@/entities/issueMilestone/model/parseToDropdownOption';
import { useUserList } from '@/entities/user/hooks/useUserList';
import { parseUserToDropdownOption } from '@/entities/user/model/parseToDropdownOption';

export function useIssueCreateOptions() {
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
		data: usersData,
		isLoading: userLoading,
		isError: userError,
	} = useUserList();

	const labelOptions =
		labelData?.labels.map(parseLabelOptionToDropdownOption) ?? [];
	const milestoneOptions =
		milestoneData?.milestones.map(parseMilestoneOptionToDropdownOption) ?? [];
	const userOptions = usersData?.users.map(parseUserToDropdownOption) ?? [];

	return {
		labelOptions,
		milestoneOptions,
		userOptions,
		labelLoading,
		milestoneLoading,
		userLoading,
		labelError,
		milestoneError,
		userError,
		//파싱 안 된 데이터
		labelData,
		milestoneData,
		usersData,
	};
}
