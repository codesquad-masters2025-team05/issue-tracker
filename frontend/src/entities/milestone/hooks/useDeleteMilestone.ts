import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteMilestone } from '../api/milestoneApi';

export function useDeleteMilestone(onSuccess?: () => void) {
	return useMutation<void, Error, number>({
		mutationFn: deleteMilestone,
		onSuccess: () => {
			toast.success('마일스톤이 삭제되었습니다.');
			onSuccess?.();
		},
		onError: (err) => {
			toast.error(err.message || '마일스톤 삭제에 실패했습니다.');
		},
	});
}
