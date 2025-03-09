'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import { useEffect, useState } from 'react'
import weddingProps from '@/types/weddingProps'
import axios from 'axios'

export default function WeddingsGuest() {
  const {userToken} = useContextWrap()
  const [guestWeddingsArray, setGuestWeddingsArray] = useState<weddingProps[]>([
      {
        id: 0,
        weddingTitle: '',
        weddingDate: '',
        shippingAddress: '',
        createdBy: '',
      },
    ])
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
    
  return (
    <ul className="flex flex-col text-center items-center">
      {guestWeddingsArray.map((wedding) => (
        <div
          id={`${wedding.id}`}
          key={wedding.id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <li
            onClick={() => {}}
            key={wedding.id}
            className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
          >
            <h2 className="font-bold p-2">{wedding.weddingTitle}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
              <p className="text-xs sm:text-sm">
                Wedding date: {wedding.weddingDate}
              </p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={`/giftList/${wedding.id}`}
                  className=" text-xs  text-orangeText hover:underline sm:text-base"
                >
                  See this wedding's gift list
                </Link>
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}