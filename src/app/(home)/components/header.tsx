'use client';

import Autocomplete from '@/components/ui/autocomplete';
import type { TransformMode } from '../page';

const options: {
  value: TransformMode;
  label: string;
}[] = [
  { value: 'interface', label: 'Interface' },
  { value: 'initialState', label: 'Initial State' },
];

interface HeaderProps {
  currentMode: TransformMode;
  onChangeOption: (newMode: TransformMode) => void;
}

function Header({ onChangeOption, currentMode }: HeaderProps) {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold text-primary'>Type-It</h1>
      <Autocomplete
        options={options}
        getOptionLabel={(opt) => opt.label}
        label='Select an option'
        value={options.find((e) => e.value === currentMode)}
        handleClickOption={(opt) => onChangeOption(opt.value)}
      />
    </div>
  );
}

export default Header;
