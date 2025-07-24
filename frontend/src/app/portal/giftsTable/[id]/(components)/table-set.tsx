'use client'

import { useEffect } from 'react'
import useGetGiftedProducts from '../(hooks)/useGetGiftedProducts'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { ClipLoader } from 'react-spinners'
import { useShallow } from 'zustand/shallow'

export default function TableSet() {
  const { giftedProducts, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      giftedProducts: store.giftedProducts,
      hasHydrated: store.hasHydrated,
    })),
  )

  const getGiftedProducts = useGetGiftedProducts()
  useEffect(() => {
    getGiftedProducts()
  }, [getGiftedProducts])

  if (!hasHydrated) {
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-10 py-10">
      <DataTable columns={columns} data={giftedProducts} />
    </div>
  )
}
