'use client';

import { CustomFilterProps } from '@/types';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const params = new URLSearchParams(searchParams);
    if (e.value) {
      params.set(title, e.value.toLowerCase());
    } else {
      params.delete(title);
    }

    const newPathname = `${pathname}?${params.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src={'/chevron-up-down.svg'}
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={
                    'relative cursor-default select-none py-2 px-4 text-gray-900 data-[active]:bg-primary-blue data-[active]:text-white'
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
