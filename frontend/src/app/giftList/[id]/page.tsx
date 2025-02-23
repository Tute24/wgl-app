'use client'

import LoggedHeader from '../../../components/Headers/LoggedHeader'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, FormEvent, useState } from 'react'
import GuestList from '../../../components/giftsListDisplay/GuestList'
import OwnerList from '../../../components/giftsListDisplay/OwnerList'
import useGiftPresent from '@/functions/giftPresentFunction'
import useGetData from '@/functions/getWeddingDataFunction'
import useDeleteGift from '@/functions/useDeleteGift'
import useSubmitUpdate from '@/functions/useSubmitUpdate'
import { useParams } from 'next/navigation'
import useMakeRequest from '@/functions/useMakeRequest'
import GuestRequest from '@/components/giftsListDisplay/GuestRequest'
import giftCreateProps from '@/types/giftCreateProps'
import axios from 'axios'
import useSubmitNewGift from '@/functions/useSubmitNewGifts'

export default function giftsList() {
  const {
    userToken,
    isGiftSent,
    setIsGiftSent,
    giftsArray,
    setGiftsArray,
    sendGiftObj,
    setSendGiftObj,
    isCreator,
    notGuest,
    setNotGuest,
    toUpdate,
    setToUpdate,
    updateProps,
    setUpdateProps,
    statusMessage,
    createNewGift,
    setCreateNewGift
  } = useContextWrap()

  const { id } = useParams()
  const weddingID = Number(id)
  const [isGiftingSetup, setIsGiftingSetup] = useState<boolean>(false)
  const [selectedGiftID, setSelectedGiftID] = useState<number>(0)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendGiftObj({ ...sendGiftObj, [e.target.name]: e.target.value })
  }

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
      prev.map((gift,i)=> i===index ? {...gift,[event.target.name]:event.target.value} : gift)
    )}

  
  const submitNewGifts = useSubmitNewGift()
  checkAuth()
  useGetData()
  useGiftPresent()

  const deleteGift = useDeleteGift()
  const logOut = useLogOut()
  const makeRequest = useMakeRequest(weddingID)
  const submitUpdate = useSubmitUpdate()

  return (
    <>
      {userToken && notGuest && !isCreator && (
        <>
          <div>
            <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2>
              Not a guest of this wedding, make a request or go back to the
              initial page
            </h2>
            <GuestRequest
              submitRequest={makeRequest}
              setNotGuest={setNotGuest}
              statusMessage={statusMessage}
            />
          </div>
        </>
      )}
      {userToken && isCreator && (
        <>
          <div>
            <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
          </div>

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
      {userToken && !notGuest && !isCreator && (
        <>
          <div>
            <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's guest</h1>
            <div>
              <GuestList
                giftsArray={giftsArray}
                isGiftingSetup={isGiftingSetup}
                setIsGiftingSetup={setIsGiftingSetup}
                isGiftSent={isGiftSent}
                setIsGiftSent={setIsGiftSent}
                sendGiftObj={sendGiftObj}
                setSendGiftObj={setSendGiftObj}
                onChange={handleInputChange}
                setGiftsArray={setGiftsArray}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
