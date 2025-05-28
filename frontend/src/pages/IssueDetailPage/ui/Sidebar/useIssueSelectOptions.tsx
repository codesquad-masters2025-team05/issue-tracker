import { useIssueLabelOptions } from '@/entities/issueLabel/hooks/useIssueLabelOptions';
import { useIssueMilestoneOptions } from '@/entities/issueMilestone/hooks/useIssueMilestoneOptions';
import { useUserList } from '@/entities/user/hooks/useUserList';

export function useIssueSelectOptions() {
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

	return {
		labelData,
		milestoneData,
		usersData,

		labelLoading,
		milestoneLoading,
		userLoading,

		labelError,
		milestoneError,
		userError,
	};
}
