'use client'

import GuestList from '@/app/giftList/[id]/(components)/giftsListDisplay/GuestList'
import GuestRequest from '@/app/giftList/[id]/(components)/giftsListDisplay/GuestRequest'
import OwnerList from '@/app/giftList/[id]/(components)/giftsListDisplay/OwnerList'
import { useContextWrap } from '@/contextAPI/context'
import useGetData from '@/app/giftList/[id]/(hooks)/useGetData'

export default function ConditionalRenderingListPage() {
  const { notGuest, isCreator } = useContextWrap()
  useGetData()
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
            <div className="flex flex-col items-center">
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
