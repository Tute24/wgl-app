'use client'

import LoggedHeader from '../../../components/Headers/LoggedHeader'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, useState } from 'react'
import GuestList from '../../../components/giftsListDisplay/GuestList'
import OwnerList from '../../../components/giftsListDisplay/OwnerList'
import useGiftPresent from '@/functions/giftPresentFunction'
import useGetData from '@/functions/getWeddingDataFunction'
import giftsProps from '@/types/giftsProps'
import axios from 'axios'
import useDeleteGift from '@/functions/useDeleteGift'

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
  } = useContextWrap()

  const [isGiftingSetup, setIsGiftingSetup] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState<boolean>(false)
  const [selectedGiftID, setSelectedGiftID] = useState<number>(0)
  const [updateProps, setUpdateProps] = useState({
    giftID: 0,
    productName: '',
    quantity: 0,
    productLink: '',
  })

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

  async function submitUpdate() {
    try {
      const response = await axios.post(
        'http://localhost:3000/updateGift',
        updateProps,
        {
          headers: {
            Authorization: `Bearer: ${userToken}`,
          },
        }
      )

      if (response.status === 200) {
        setGiftsArray((prev: giftsProps[]) =>
          prev.map((gift) =>
            updateProps.giftID === gift.id
              ? {
                  ...gift,
                  productLink: updateProps.productLink,
                  productName: updateProps.productName,
                  quantity: updateProps.quantity,
                }
              : gift
          )
        )
        setToUpdate(false)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log('User not authenticated.')
        }
        if (error.response?.status === 403) {
          console.log(
            `Invalid/Expired token - User is not this wedding's creator`
          )
        }
        if (error.response?.status === 404) {
          console.log('User/Gift not found.')
        }
        if (error.response?.status === 500) {
          console.log('Server error.')
        }
      }
      console.log(error)
    }
  }

  checkAuth()

  useGetData()

  const logOut = useLogOut()

  useGiftPresent()

  const deleteGift = useDeleteGift()

  return (
    <>
      {userToken && notGuest && (
        <>
          <div>
            <LoggedHeader onClick={logOut} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2>
              Not a guest of this wedding, make a request or go back to the
              initial page
            </h2>
          </div>
        </>
      )}
      {userToken && isCreator && (
        <>
          <div>
            <LoggedHeader onClick={logOut} />
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
              />
            </div>
          </div>
        </>
      )}
      {userToken && !notGuest && !isCreator && (
        <>
          <div>
            <LoggedHeader onClick={logOut} />
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
