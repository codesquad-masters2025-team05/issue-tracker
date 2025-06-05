import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createMilestone } from '../api/milestoneApi';
import type {
	MilestoneCreatePayload,
	MilestoneCreateResponseDto,
} from '../model/milestone.types';

export function useCreateMilestone(onSuccess?: () => void) {
	return useMutation<
		MilestoneCreateResponseDto,
		Error,
		{ payload: MilestoneCreatePayload }
	>({
		mutationFn: ({ payload }) => createMilestone(payload),
		onSuccess: () => {
			onSuccess?.();
		},
		onError: () => {
			toast.error('마일스톤 생성에 실패했습니다.');
		},
	});
}
