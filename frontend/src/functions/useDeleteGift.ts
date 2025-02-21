import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'

export default function useDeleteGift() {
  const { userToken, setGiftsArray, giftsArray } = useContextWrap()

  async function deleteGift(giftID: number) {
    const identifier = {
      giftID: giftID,
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/deleteGift',
        identifier,
        {
          headers: {
            Authorization: `Bearer: ${userToken}`,
          },
        }
      )

      if (response.status === 200) {
        const filteredGiftsArrays = giftsArray.filter(
          (gift) => gift.id !== giftID
        )
        setGiftsArray(filteredGiftsArrays)
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

  return deleteGift
}
