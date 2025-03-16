import { useContextWrap } from "@/contextAPI/context"
import giftCreateProps from "@/types/giftCreateProps"
import axios from "axios"
import { useParams } from "next/navigation"
import { FormEvent } from "react"

export default function useSubmitNewGift (createNewGift:giftCreateProps[]){

    const { id } = useParams()
    const weddingID = Number(id)
    const {userToken,setGiftsArray}= useContextWrap()

    async function submitNewGifts(e:FormEvent){
        e.preventDefault()
        
        try{
          if(userToken){
            const response = await axios.post('http://localhost:3000/createNewGift',createNewGift,{headers:{
              Authorization: `Bearer ${userToken}`
            }, params:{
              id: weddingID
            }})
            
            if(response.status===200){
              setGiftsArray(response.data.newGifts)
            }
            
          }
        }catch(error){
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
        return submitNewGifts
}