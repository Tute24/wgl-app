import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { WeddingsProps } from '@/stores/weddings/weddings.store'
import newListSchema from '@/zodSchemas/newListSchema'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

export default function useSubmitList() {
  type listData = z.infer<typeof newListSchema>
  const { setStatusMessage } = useContextWrap()
  const { setOwnWeddings, ownWeddings } = useWeddingsStore(
    useShallow((store) => ({
      setOwnWeddings: store.setOwnWeddings,
      ownWeddings: store.ownWeddings,
    })),
  )
  const route = useRouter()

  async function submitList(data: listData) {
    console.log(data)
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/weddings/create',
        data,
      })

      if (response.status === 200) {
        const newWedding = response.data.newlyCreatedWedding as WeddingsProps
        setOwnWeddings([...ownWeddings, newWedding])
        setStatusMessage('Wedding created successfully!')
      }
    } catch (error) {
      AxiosErrorHandler({ error, setStatusMessage, route })
    }
  }

  return submitList
}
