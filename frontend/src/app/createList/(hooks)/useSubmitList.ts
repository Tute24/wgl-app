import { useContextWrap } from '@/contextAPI/context'
import newListSchema from '@/zodSchemas/newListSchema'
import axios from 'axios'
import { FormEvent } from 'react'
import { z } from 'zod'

export default function useSubmitList() {
  type listData = z.infer<typeof newListSchema>
  const { userToken, setStatusMessage } = useContextWrap()

  async function submitList(data: listData) {
    if (userToken) {
      console.log(data)
      try {
        const response = await axios.post(
          'http://localhost:3000/createList',
          data,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        if (response.status === 200) {
          setStatusMessage('Wedding created successfully!')
        }
        // setListData({
        //   listTitle: '',
        //   weddingDate: '',
        //   shippingAddress: '',
        //   gifts: [
        //     {
        //       productName: '',
        //       productLink: '',
        //       quantity: 0,
        //     },
        //   ],
        // })
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setStatusMessage(`User doesn't have permission.`)
          }
          if (error.response?.status === 403) {
            setStatusMessage(`Invalid credentials.`)
          }
          if (error.response?.status === 404) {
            setStatusMessage(`Not found.`)
          }
          if (error.response?.status === 500) {
            setStatusMessage(`Something went wrong. Try again.`)
          }
        }
      }
    }
  }

  return submitList
}
