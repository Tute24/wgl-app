import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import { useRouter } from 'next/navigation'
import { objValuesType } from '../(components)/giftsListDisplay/owner-list'
import { AxiosApi } from '@/common/axios-api/axios-api'

export default function useSubmitUpdate() {
  const { setGiftsArray, setSelectedGiftID } = useContextWrap()
  const route = useRouter()
  async function submitUpdate(objValues: objValuesType, giftID: number) {
    const updateProps = {
      productLink: objValues.productLink,
      productName: objValues.productName,
      quantity: objValues.quantity,
      giftID,
    }
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/gifts/update',
        data: updateProps,
      })
      if (response.status === 200) {
        setSelectedGiftID(0)
        setGiftsArray((prev: giftsProps[]) =>
          prev.map((gift) =>
            updateProps.giftID === gift.id
              ? {
                  ...gift,
                  productLink: updateProps.productLink,
                  productName: updateProps.productName,
                  quantity: updateProps.quantity,
                }
              : gift,
          ),
        )
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return submitUpdate
}
