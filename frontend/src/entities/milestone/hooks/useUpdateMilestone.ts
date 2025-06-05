import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateMilestone } from '../api/milestoneApi';
import type { MilestoneUpdatePayload } from '../model/milestone.types';

export function useUpdateMilestone(onSuccess?: () => void) {
	return useMutation<void, Error, { payload: MilestoneUpdatePayload }>({
		mutationFn: ({ payload }) => updateMilestone(payload),
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '마일스톤 수정에 실패했습니다.');
		},
	});
}
