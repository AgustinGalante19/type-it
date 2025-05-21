'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AutoCompleteProps<T> {
  options: T[];
  label: string;
  width?: number;
  handleClickOption: (item: T) => void;
  getOptionLabel: (option: T) => React.ReactNode;
  value?: T;
  defaultValue?: T;
  isDisabled?: boolean;
  className?: string;
}

const Autocomplete = <T,>({
  options,
  label,
  width = 200,
  handleClickOption,
  value,
  defaultValue,
  getOptionLabel,
  isDisabled,
  className,
}: AutoCompleteProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState<T | null>(null);

  const comboBoxRef = useRef<HTMLDivElement>(null);

  const onClickCombo = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (defaultValue && options) {
      const newCurrentValue = options.find(
        (item) => getOptionLabel(item) === getOptionLabel(defaultValue)
      );
      if (newCurrentValue) setCurrentValue(newCurrentValue);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    setCurrentValue(value as T);
  }, [value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      comboBoxRef.current &&
      !comboBoxRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={comboBoxRef} className='relative'>
      <Button
        disabled={isDisabled}
        className={cn(
          `text-start flex justify-between border border-neutral-600`,
          className
        )}
        variant='ghost'
        style={{ width }}
        type='button'
        onClick={onClickCombo}
      >
        <span className='text-nowrap overflow-hidden'>
          {!currentValue ? label : getOptionLabel(currentValue)}
        </span>
        <div className='pl-2'>
          <ChevronsUpDown className='text-neutral-500' size={16} />
        </div>
      </Button>
      {isVisible && (
        <ul
          className={`absolute max-h-[200px] overflow-y-auto overflow-x-hidden over space-y-2 border-x border rounded-md z-[9999] shadow-md mt-1`}
          style={{ width }}
        >
          {options.map((option, i) => (
            <li
              key={i}
              className='hover:bg-neutral-500 transition-colors rounded text-sm'
            >
              <button
                type='button'
                className='w-full text-start p-2'
                onClick={() => {
                  handleClickOption(option);
                  setCurrentValue(option);
                  onClickCombo();
                }}
              >
                {getOptionLabel(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
