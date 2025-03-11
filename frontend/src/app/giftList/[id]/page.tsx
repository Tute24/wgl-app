'use client'

import LoggedHeader from '../../../components/Headers/LoggedHeader'
import checkAuth from '@/functions/checkAuthFunction'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, useState } from 'react'
import GuestList from '../../../components/giftsListDisplay/GuestList'
import OwnerList from '../../../components/giftsListDisplay/OwnerList'
import useGiftPresent from '@/functions/giftPresentFunction'
import useGetData from '@/functions/getWeddingDataFunction'
import useDeleteGift from '@/functions/useDeleteGift'
import useSubmitUpdate from '@/functions/useSubmitUpdate'
import GuestRequest from '@/components/giftsListDisplay/GuestRequest'
import useSubmitNewGift from '@/functions/useSubmitNewGifts'

export default function giftsList() {
  const {
    isGiftSent,
    setIsGiftSent,
    giftsArray,
    isCreator,
    notGuest,
    toUpdate,
    setToUpdate,
    updateProps,
    setUpdateProps,
    createNewGift,
    setCreateNewGift,
  } = useContextWrap()

  const [selectedGiftID, setSelectedGiftID] = useState<number>(0)

  function handleUpdateInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateProps({
      ...updateProps,
      [e.target.name]: e.target.value,
      giftID: selectedGiftID,
    })
  }

  function newGiftInputHandler(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCreateNewGift((prev) =>
      prev.map((gift, i) =>
        i === index
          ? { ...gift, [event.target.name]: event.target.value }
          : gift
      )
    )
  }

  const submitNewGifts = useSubmitNewGift()
  checkAuth()
  useGetData()
  useGiftPresent()

  const deleteGift = useDeleteGift()
  const submitUpdate = useSubmitUpdate()

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
              <OwnerList
                giftsArray={giftsArray}
                selectedGiftID={selectedGiftID}
                setSelectedGiftID={setSelectedGiftID}
                onChange={handleUpdateInputChange}
                updateProps={updateProps}
                setUpdateProps={setUpdateProps}
                submitChange={submitUpdate}
                setToUpdate={setToUpdate}
                toUpdate={toUpdate}
                deleteGift={deleteGift}
                createNewGift={createNewGift}
                setCreateNewGift={setCreateNewGift}
                newInputChange={newGiftInputHandler}
                onSubmit={submitNewGifts}
              />
            </div>
          </div>
        </>
      )}
      {!notGuest && !isCreator && (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's guest</h1>
            <div>
              <GuestList
                isGiftSent={isGiftSent}
                setIsGiftSent={setIsGiftSent}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
