'use client'

import GuestList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-list'
import GuestRequest from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-request'
import OwnerList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/owner-list'
import { useContextWrap } from '@/contextAPI/context'
import { useEffect } from 'react'
import useGetGifts from '@/app/portal/giftList/[id]/(hooks)/useGetGifts'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useShallow } from 'zustand/shallow'
import { ClipLoader } from 'react-spinners'

export default function ConditionalListRender() {
  const { notGuest } = useContextWrap()
  const getGifts = useGetGifts()
  const { isCreator, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      isCreator: store.isCreator,
      hasHydrated: store.hasHydrated,
    })),
  )

  useEffect(() => {
    getGifts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!hasHydrated)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )

  return (
    <>
      <div className="w-full">
        {notGuest && !isCreator && (
          <>
            <div className="flex flex-col items-center">
              <GuestRequest />
            </div>
          </>
        )}
        {isCreator && (
          <>
            <div className="flex flex-col">
              <OwnerList />
            </div>
          </>
        )}
        {!notGuest && !isCreator && (
          <>
            <div className="flex flex-col items-center">
              <GuestList />
            </div>
          </>
        )}
      </div>
    </>
  )
}
