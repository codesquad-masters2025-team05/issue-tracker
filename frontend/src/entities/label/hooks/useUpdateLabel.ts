import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateLabel } from '../api/labelApi';
import type { LabelUpdatePayload } from '../model/label.types';

export function useUpdateLabel(onSuccess?: () => void) {
	return useMutation<void, Error, { payload: LabelUpdatePayload }>({
		mutationFn: ({ payload }) => updateLabel(payload),
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message || '라벨 수정에 실패했습니다.');
		},
	});
}
