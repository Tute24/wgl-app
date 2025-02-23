'use client'

import axios from 'axios'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useEffect, useState } from 'react'
import { useContextWrap } from '@/contextAPI/context'
import WeddingsOwn from '../../components/weddingsDisplay/OwnWeddings'
import WeddingsGuest from '../../components/weddingsDisplay/GuestWeddings'
import weddingProps from '@/types/weddingProps'
import useLogOut from '../../functions/logOutFunction'
import checkAuth from '@/functions/checkAuthFunction'

export default function Dashboard() {


  const { userToken, setNotGuest, ownWeddingsArray, setOwnWeddingsArray } = useContextWrap()
  
  const [guestWeddingsArray,setGuestWeddingsArray] = useState<weddingProps[]>([
    {
      id: '',
      weddingTitle: '',
      weddingDate: '',
      shippingAddress: '',
      createdBy: '',
    }
  ])

  checkAuth()

  useEffect(() => {
    async function getWeddings() {
      if (userToken)
        try {
          const response = await axios.get(
            'http://localhost:3000/getWeddings',
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
          if (response.status === 200) {
            setOwnWeddingsArray(response.data.own)
            setGuestWeddingsArray(response.data.invited)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log('User not authenticated.')
            }
            if (error.response?.status === 403) {
              console.log('Invalid/Expired token.')
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

    getWeddings()
  }, [userToken])

  const logOut = useLogOut()

  return (
    <>
      <div>
        {userToken && (
          <>
            <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
            <div className='flex flex-row justify-center'>
              <div className='w-1/2'>
                <WeddingsOwn weddingsArray={ownWeddingsArray} />
              </div>
              <div className='w-1/2git'>
                <WeddingsGuest weddingsArray={guestWeddingsArray}/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
