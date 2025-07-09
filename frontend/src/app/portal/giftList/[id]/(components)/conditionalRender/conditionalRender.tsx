'use client'

import GuestList from '@/app/giftList/[id]/(components)/giftsListDisplay/guest-list'
import GuestRequest from '@/app/giftList/[id]/(components)/giftsListDisplay/guest-request'
import OwnerList from '@/app/giftList/[id]/(components)/giftsListDisplay/owner-list'
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
