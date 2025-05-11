import { objValuesType } from '@/app/giftList/[id]/(components)/giftsListDisplay/OwnerList'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function useSubmitUpdate(
  objValues: objValuesType,
  giftID: number
) {
  const { userToken, setGiftsArray, setToUpdate } = useContextWrap()
  const updateProps = {
    productLink: objValues.productLink,
    productName: objValues.productName,
    quantity: objValues.quantity,
    giftID: giftID,
  }
  const route = useRouter()
  async function submitUpdate() {
    try {
      const response = await axios.post(
        'http://localhost:3000/updateGift',
        updateProps,
        {
          headers: {
            Authorization: `Bearer: ${userToken}`,
          },
        }
      )

      if (response.status === 200) {
        setGiftsArray((prev: giftsProps[]) =>
          prev.map((gift) =>
            updateProps.giftID === gift.id
              ? {
                  ...gift,
                  productLink: updateProps.productLink,
                  productName: updateProps.productName,
                  quantity: updateProps.quantity,
                }
              : gift
          )
        )
        setToUpdate(false)
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }

  return submitUpdate
}
