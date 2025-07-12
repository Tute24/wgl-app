import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useAuthStore } from '@/stores/auth/auth.provider'
import { useRouter } from 'next/navigation'

export default function useDeleteWedding() {
  const { setOwnWeddingsArray } = useContextWrap()
  const route = useRouter()
  const token = useAuthStore((store) => store.token)
  async function deleteWedding(id: number) {
    const weddingID = {
      id,
    }
    if (token) {
      try {
        const response = await AxiosApi({
          httpMethod: 'post',
          route: '/weddings/delete',
          data: weddingID,
        })

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
