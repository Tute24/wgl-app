'use client'

import LoggedHeader from '../../../components/Headers/LoggedHeader'
import checkAuth from '@/functions/checkAuthFunction'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent } from 'react'
import GuestList from '../../../components/giftsListDisplay/GuestList'
import OwnerList from '../../../components/giftsListDisplay/OwnerList'
import useGetData from '@/functions/getWeddingDataFunction'
import useDeleteGift from '@/functions/useDeleteGift'
import GuestRequest from '@/components/giftsListDisplay/GuestRequest'
import useSubmitNewGift from '@/functions/useSubmitNewGifts'

export default function giftsList() {
  const {
    isCreator,
    notGuest,
  } = useContextWrap()

  checkAuth()
  useGetData()

  return (
    <>
      <div>
        <LoggedHeader />
      </div>
      {notGuest && !isCreator && (
        <>
          <div className="flex flex-col items-center justify-center">
            <h2>
              Not a guest of this wedding, make a request or go back to the
              initial page
            </h2>
            <GuestRequest
            />
          </div>
        </>
      )}
      {isCreator && (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's owner</h1>
            <div>
              <OwnerList/>
            </div>
          </div>
        </>
      )}
      {!notGuest && !isCreator && (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's guest</h1>
            <div>
              <GuestList/>
            </div>
          </div>
        </>
      )}
    </>
  )
}
