'use client';

import Autocomplete from '@/components/ui/autocomplete';

const options = [
  { value: 'inteface', label: 'Interface' },
  { value: 'initialState', label: 'Initial State' },
];

function Header() {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold text-primary'>Type-It</h1>
      <Autocomplete
        options={options}
        getOptionLabel={(opt) => opt.label}
        label='Select an option'
        defaultValue={options[0]}
        handleClickOption={(opt) => console.log(opt)}
      />
    </div>
  );
}

export default Header;
