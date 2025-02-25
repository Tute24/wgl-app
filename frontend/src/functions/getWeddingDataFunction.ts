import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect} from 'react'

export default function useGetData() {
  const { id } = useParams()
  const weddingID = Number(id)
  const {
    userToken,
    setWeddingData,
    setGiftsArray,
    setIsCreator,
    setNotGuest
  } = useContextWrap()

  useEffect(() => {
    async function getData() {
      if (userToken) {
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
          } else {
            setIsCreator(false)
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
  }, [userToken])
}
