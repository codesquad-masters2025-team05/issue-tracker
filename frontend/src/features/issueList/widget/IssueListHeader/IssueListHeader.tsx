import AssigneeDropdown from '@/features/issueList/widget/FilteringPanel/AssigneeDropdown';
import { Checkbox } from '../../shared/CheckBox';
import AuthorDropdown from '../FilteringPanel/AuthorDropdown';
import LabelDropdown from '../FilteringPanel/LabelDropdown';
import MilestoneDropdown from '../FilteringPanel/MilestoneDropdown ';

export function IssueListHeader() {
	return (
		<div className='w-full h-[64px] flex items-center justify-between px-8'>
			<div>
				<Checkbox />
				열린이슈/닫힌이슈
			</div>
			<div className='flex items-center gap-8'>
				<AssigneeDropdown />
				<LabelDropdown />
				<MilestoneDropdown />
				<AuthorDropdown />
			</div>
		</div>
	);
}
