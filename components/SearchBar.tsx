'use client';

import React, { useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button
    type="submit"
    className={`-ml-3 z-10 ${otherClasses}`}
  >
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please fill in search bar');
    }
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const params = new URLSearchParams(searchParams);

    if (model) {
      params.set('model', model);
    } else {
      params.delete('model');
    }
    if (manufacturer) {
      params.set('manufacturer', manufacturer);
    } else {
      params.delete('manufacturer');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      className="searchbar"
      onSubmit={handleSearch}
    >
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="car model"
          width={25}
          height={25}
          className="absolute size-5 ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
