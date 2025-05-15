import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function useDeleteWedding() {
  const { userToken, setOwnWeddingsArray } = useContextWrap()
  const route = useRouter()
  async function deleteWedding(id: number) {
    const weddingID = {
      id,
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
          },
        )

        if (response.status === 200) {
          setOwnWeddingsArray((prev) => prev.filter((item) => item.id !== id))
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
    }
  }
  return deleteWedding
}
