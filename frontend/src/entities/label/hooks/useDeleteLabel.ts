import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteLabel } from '../api/labelApi';

export function useDeleteLabel() {
	return useMutation<void, Error, number>({
		mutationFn: deleteLabel,
		onSuccess: () => {
			toast.success('레이블이 삭제되었습니다.');
		},
		onError: (err) => {
			toast.error(err.message || '레이블 삭제에 실패했습니다.');
		},
	});
}
