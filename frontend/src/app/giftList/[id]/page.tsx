'use client'

import { useParams } from 'next/navigation'
import LoggedHeader from '../../../components/Headers/LoggedHeader'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'
import { useContextWrap } from '@/contextAPI/context'
import { useEffect, useState } from 'react'
import giftsProps from '@/types/giftsProps'
import axios from 'axios'
import Gifts from '../../../components/giftsListDisplay/GuestList'

export default function giftsList() {
  const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')
  const { id } = useParams()
  const weddingID = Number(id)
  const { validToken } = useContextWrap()
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [notGuest, setNotGuest] = useState<boolean>(false)
  const [giftsArray, setGiftsArray] = useState<giftsProps[]>([
    {
      id: 0,
      quantity: 0,
      productName: '',
      productLink: '',
      fromWedding: 0,
      giftedBy: '',
    },
  ])
  const [weddingData, setWeddingData] = useState({
    id: '',
    weddingTitle: '',
    weddingDate: '',
    shippingAddress: '',
    createdBy: '',
    gifts: [
      {
        id: 0,
        quantity: 0,
        productName: '',
        productLink: '',
        fromWedding: 0,
        giftedBy: '',
      },
    ],
  })

  checkAuth()
  const logOut = useLogOut()

  useEffect(() => {
    async function getData() {
      if (validToken) {
        try {
          const response = await axios.get('http://localhost:3000/getList', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              id: weddingID,
            },
          })

          setWeddingData(response.data.wedding)
          setGiftsArray(response.data.wedding.gifts)
          if (response.data.checkAdmin.isCreator === true) {
            setIsCreator(true)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log('User not authenticated.')
            }
            if (error.response?.status === 403) {
              console.log('Invalid/Expired token.')
              setNotGuest(true)
            }
            if (error.response?.status === 404) {
              console.log('User not found.')
            }
            if (error.response?.status === 500) {
              console.log('Server error.')
            }
          }
        }
      }
    }

    getData()
  }, [validToken])

  return (
    <>
      {validToken && (
          <div>
            <LoggedHeader onClick={logOut} />
          </div>
        ) &&
        notGuest && (
          <div className="flex flex-col items-center justify-center">
            <h2>
              Not a guest of this wedding, make a request or go back to the
              initial page
            </h2>
          </div>
        )}
      {validToken && (
          <div>
            <LoggedHeader onClick={logOut} />
          </div>
        ) &&
        isCreator && (
          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's owner</h1>
            <div>
              <Gifts giftsArray={giftsArray} />
            </div>
          </div>
        )}
      {validToken && (
          <div>
            <LoggedHeader onClick={logOut} />
          </div>
        ) &&
        !isCreator && (
          <div className="flex flex-col items-center justify-center">
            <h1>You're this wedding's guest</h1>
            <div>
              <Gifts giftsArray={giftsArray} />
            </div>
          </div>
        )}
    </>
  )
}
