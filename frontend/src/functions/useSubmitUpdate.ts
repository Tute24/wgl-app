import { objValuesType } from "@/components/giftsListDisplay/OwnerList"
import { useContextWrap } from "@/contextAPI/context"
import giftsProps from "@/types/giftsProps"
import axios from "axios"

export default function useSubmitUpdate(objValues:objValuesType, giftID:number){

    const {userToken, setGiftsArray, setToUpdate} = useContextWrap()
    const updateProps = {
      productLink: objValues.productLink,
      productName: objValues.productName,
      quantity: objValues.quantity,
      giftID: giftID
    }

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

      return submitUpdate

}