'use client';

import { ShowMoreProps } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomButton from './CustomButton';

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const params = new URLSearchParams(searchParams);
    params.set('limit', `${newLimit}`);
    const newPathname = `${pathname}?${params.toString()}`;
    router.push(newPathname, { scroll: false });
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
