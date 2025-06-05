import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createLabel } from '../api/labelApi';
import type {
	LabelCreatePayload,
	LabelCreateResponseDto,
} from '../model/label.types';

export function useCreateLabel(onSuccess?: () => void) {
	return useMutation<
		LabelCreateResponseDto,
		Error,
		{ payload: LabelCreatePayload }
	>({
		mutationFn: ({ payload }: { payload: LabelCreatePayload }) =>
			createLabel(payload),
		onSuccess: () => {
			onSuccess?.();
		},
		onError: () => {
			toast.error('라벨 생성에 실패했습니다.');
		},
	});
}
