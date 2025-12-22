'use client';

import { useEffect } from 'react';
import useGetGiftedProducts from '../(hooks)/useGetGiftedProducts';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { ClipLoader } from 'react-spinners';
import { useShallow } from 'zustand/shallow';
import { useGeneralStore } from '@/stores/general/general.provider';

export default function TableSet() {
  const { giftedProducts, listHeader, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      giftedProducts: store.giftedProducts,
      listHeader: store.listHeader,
      hasHydrated: store.hasHydrated,
    })),
  );
  const { isRendering } = useGeneralStore(
    useShallow((store) => ({
      isRendering: store.isRendering,
    })),
  );
  const getGiftedProducts = useGetGiftedProducts();
  useEffect(() => {
    getGiftedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasHydrated || !listHeader) {
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} data-testid="clip-loader" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center text-center gap-3 font-inter">
        <h2 className="sm:text-2xl text-amber-800 font-bold px-2 sm:px-0">
          Gifted Products Table from{' '}
          <span className="text-stone-700">{listHeader.listHeaderTitle}</span>
        </h2>
        <p className="text-center text-stone-500 font-medium">
          Here you can see the guests who have gifted the products on your gift list.
        </p>
      </div>
      <div className="container mx-auto px-2 sm:px-10 py-10">
        {isRendering ? (
          <div className="flex flex-col m-auto h-screen justify-center items-center">
            <ClipLoader color="#92400e" size={150} data-testid="clip-loader-table" />
          </div>
        ) : (
          <DataTable columns={columns} data={giftedProducts} />
        )}
      </div>
    </div>
  );
}
