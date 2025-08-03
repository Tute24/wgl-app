import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'

import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

export default function useDeleteWedding() {
  const route = useRouter()
  const { setOwnWeddings, ownWeddings } = useWeddingsStore(
    useShallow((store) => ({
      setOwnWeddings: store.setOwnWeddings,
      ownWeddings: store.ownWeddings,
    })),
  )
  async function deleteWedding(id: number) {
    const weddingID = {
      id,
    }

    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/weddings/delete',
        data: weddingID,
      })

      if (response.status === 200) {
        setOwnWeddings(ownWeddings.filter((item) => item.id !== id))
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return deleteWedding
}
