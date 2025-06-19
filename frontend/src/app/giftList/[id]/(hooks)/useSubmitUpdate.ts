import { objValuesType } from '@/app/giftList/[id]/(components)/giftsListDisplay/OwnerList'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function useSubmitUpdate() {
  const { userToken, setGiftsArray, setSelectedGiftID } = useContextWrap()

  const route = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  async function submitUpdate(objValues: objValuesType, giftID: number) {
    const updateProps = {
      productLink: objValues.productLink,
      productName: objValues.productName,
      quantity: objValues.quantity,
      giftID,
    }
    console.log(updateProps)
    try {
      const response = await axios.post(`${apiURL}/gifts/update`, updateProps, {
        headers: {
          Authorization: `Bearer: ${userToken}`,
        },
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
