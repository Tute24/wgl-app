'use client'

import axios from 'axios'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useEffect, useState } from 'react'
import { useContextWrap } from '@/contextAPI/context'
import List from '../../components/weddingsDisplay/List'
import weddingProps from '@/types/weddingProps'
import useLogOut from '../../functions/logOutFunction'
import checkAuth from '@/functions/checkAuthFunction'

export default function Dashboard() {


  const { validToken, userToken } = useContextWrap()
  const [ownWeddingsArray, setOwnWeddingsArray] = useState<weddingProps[]>([
    {
      id: '',
      weddingTitle: '',
      weddingDate: '',
      shippingAddress: '',
      createdBy: '',
    },
  ])

  checkAuth()

  useEffect(() => {
    async function getWeddings() {
      if (validToken)
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
  }, [validToken])

  const logOut = useLogOut()

  return (
    <>
      <div>
        {validToken && (
          <>
            <LoggedHeader onClick={logOut} />
            <div>
              <List weddingsArray={ownWeddingsArray} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
