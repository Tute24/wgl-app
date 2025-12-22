'use client';

import { useEffect } from 'react';
import useGetWeddings from '../../(hooks)/useGetWeddings';
import WeddingsGuest from '../weddingsDisplay/guest-weddings';
import WeddingsOwn from '../weddingsDisplay/own-weddings';

export default function DashboardView() {
  const getWeddings = useGetWeddings();

  useEffect(() => {
    getWeddings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-20 items-center md:items-start w-full pb-5 md:px-20 xl:px-40">
        <div className="flex flex-col gap-6 items-center min-h-[250px]">
          <h1 className="font-bold font-poppins text-amber-800 text-2xl">My Weddings:</h1>
          <WeddingsOwn />
        </div>
        <div className="flex flex-col gap-6 items-center min-h-[250px]">
          <h1 className="font-bold font-poppins text-amber-800 text-2xl">
            Weddings I am a guest at:
          </h1>
          <WeddingsGuest />
        </div>
      </div>
    </>
  );
}
