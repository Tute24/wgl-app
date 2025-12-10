'use client';

import GuestList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-list';
import GuestRequest from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-request';
import OwnerList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/owner-list';
import { useEffect } from 'react';
import useGetGifts from '@/app/portal/giftList/[id]/(hooks)/useGetGifts';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { useShallow } from 'zustand/shallow';
import { ClipLoader } from 'react-spinners';
import { useGeneralStore } from '@/stores/general/general.provider';

export default function ConditionalListRender() {
  const getGifts = useGetGifts();
  const { isCreator, isGuest, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      isCreator: store.isCreator,
      isGuest: store.isGuest,
      hasHydrated: store.hasHydrated,
    })),
  );
  const { isRendering } = useGeneralStore(
    useShallow((store) => ({
      isRendering: store.isRendering,
    })),
  );
  useEffect(() => {
    getGifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasHydrated || isRendering)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    );

  if (isCreator && !isGuest)
    return (
      <div className="w-full">
        <div className="flex flex-col">
          <OwnerList />
        </div>
      </div>
    );

  if (!isCreator && isGuest)
    return (
      <div className="w-full">
        <div className="flex flex-col items-center">
          <GuestList />
        </div>
      </div>
    );

  if (!isCreator && !isGuest)
    return (
      <div className="w-full">
        <div className="flex flex-col items-center">
          <GuestRequest />
        </div>
      </div>
    );
}
