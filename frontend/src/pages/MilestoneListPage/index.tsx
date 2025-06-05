import { useState } from 'react';
import { Header } from './component/Header';
import { MilestoneCreateForm } from './component/MilestoneCreateForm';
import { MilestoneList } from './component/MilestoneList';

const MilestoneListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 mt-8">
      <Header onOpen={() => setOpen(true)} />
      {open && <MilestoneCreateForm onClose={() => setOpen(false)} />}
      <MilestoneList />
    </div>
  );
};

export default MilestoneListPage;
