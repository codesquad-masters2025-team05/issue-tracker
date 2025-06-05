import type { DropdownOption } from '@/shared/ui/Dropdown/DropdownOption';
import type { IssueLabelOptionApiDto } from './labelFilter.types';

// raw → FE에서 쓸 DropdownOption으로 변환
export function parseLabelOptionToDropdownOption(
	label: IssueLabelOptionApiDto,
): DropdownOption {
	return {
		id: label.id,
		display: label.name,
		color: label.backgroundColor,
		// 필요하면 textColor도 추가로 넣을 수 있음
	};
}
