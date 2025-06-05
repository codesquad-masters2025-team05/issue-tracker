import PlusIcon from '@/assets/plus.svg?react';
import { Button } from '@/shared/ui/button';
import { NavigationButton } from '@/widgets/LabelMilestoneTabs';

interface HeaderProps {
  onOpen: () => void;
}

export const Header = ({ onOpen }: HeaderProps) => (
  <div className="flex justify-between">
    <NavigationButton />
    <Button variant="contained" size="sm" onClick={onOpen}>
      <PlusIcon className="size-4" />
      마일스톤 추가
    </Button>
  </div>
);
