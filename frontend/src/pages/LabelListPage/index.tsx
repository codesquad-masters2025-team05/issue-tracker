import { useState } from 'react';
import { Header } from './Header';
import { LabelCreateForm } from './LabelCreateForm';
import { LabelList } from './LabelList';

const LabelListPage = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className='flex flex-col gap-6 mt-8'>
			<Header onOpen={() => setOpen(true)} />
			{open && <LabelCreateForm onClose={() => setOpen(false)} />}
			<LabelList />
		</div>
	);
};

export default LabelListPage;
