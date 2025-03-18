import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'

export default function useDeleteWedding() {
  const { userToken, setOwnWeddingsArray } = useContextWrap()

  async function deleteWedding(id: Number) {
    const weddingID = {
      id: id,
    }
    if (userToken) {
      try {
        const response = await axios.post(
          'http://localhost:3000/deleteWedding',
          weddingID,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        if (response.status === 200) {
          setOwnWeddingsArray((prev) =>
            prev.filter((item) => item.id !== id)
          )
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
            console.log('User/Wedding not found.')
          }
          if (error.response?.status === 500) {
            console.log('Server error.')
          }
        }
        console.log(error)
      }
    }
  }

  return deleteWedding
}
