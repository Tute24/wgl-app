import { useContextWrap } from "@/contextAPI/context"
import axios from "axios"

export default function useMakeRequest (id: Number){

    const {userToken, setStatusMessage} = useContextWrap()
    const weddingID = id

    async function makeRequest(){
        const identifier = {
            weddingID: weddingID
        }

        if(userToken){
            try{
                const response = await axios.post('http://localhost:3000/makeRequest', identifier,{headers:{
                    Authorization: `Bearer ${userToken}`
                }})

                if(response.status === 200){
                    setStatusMessage(`Request made successfully! If the wedding list's admin accepts your request, you'll be able to see the list soon.`)
                }
            }catch(error){
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                      console.log('User not authenticated.')
                      setStatusMessage(`You are not authenticated at the moment.`)
                    }
                    
                    if (error.response?.status === 404) {
                      console.log('User/Gift not found.')
                      setStatusMessage(`User/Wedding not found.`)
                    }
                    if (error.response?.status === 500) {
                      console.log('Server error.')
                      setStatusMessage(`Something went wrong. Try again in a few minutes.`)
                    }
                  }
                  console.log(error)
                  setStatusMessage(`Something went wrong. Try again in a few minutes.`)
            }
        }
        
    }

    return makeRequest
}