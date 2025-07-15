'use client'

import GuestList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-list'
import GuestRequest from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/guest-request'
import OwnerList from '@/app/portal/giftList/[id]/(components)/giftsListDisplay/owner-list'
import { useContextWrap } from '@/contextAPI/context'
import useGetData from '@/app/portal/giftList/[id]/(hooks)/useGetData'
import { useEffect } from 'react'

export default function ConditionalRenderingListPage() {
  const { notGuest, isCreator } = useContextWrap()
  const getData = useGetData()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
