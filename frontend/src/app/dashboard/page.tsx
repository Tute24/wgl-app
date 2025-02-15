'use client'

import axios from 'axios'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useContextWrap } from '@/contextAPI/context'
import List from '../../components/weddingsDisplay/List'
import weddingProps from '@/types/weddingProps'

export default function Dashboard() {
  const route = useRouter()
  const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')
  const {validToken,setValidToken} = useContextWrap()
  const [ownWeddingsArray, setOwnWeddingsArray] = useState<weddingProps[]>( 
      [{
      id: '',
      weddingTitle: '',
      weddingDate: '',
      shippingAddress: '',
      createdBy: ''
    }]
  )

  useEffect(()=>{
    function checkAuth(){
      if(userToken === null){
        route.push('/')
        return
      }
      setValidToken(true)
    }
    checkAuth()
  },[])

  useEffect(()=>{

    async function getWeddings (){
      if(validToken)
      try{
        const response = await axios.get('http://localhost:3000/getWeddings',{headers:{
          Authorization: `Bearer ${userToken}`
        }})
        if(response.status === 200){
          setOwnWeddingsArray(response.data.own)
        }
      }catch(error){
        if(axios.isAxiosError(error)){
          if (error.response?.status === 401) {
            console.log('User not authenticated.')
          }
          if (error.response?.status === 403) {
            console.log('Invalid/Expired token.')
          }
          if (error.response?.status === 404) {
            console.log('User not found.')
          }
          if (error.response?.status === 500) {
            console.log('Server error.')
          }
        }
      }
    }

    getWeddings()

  },[validToken])

  async function LogOut() {

    if (userToken) {
      try {
        const response = await axios.get('http://localhost:3000/logOut', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (response.status === 200) {
          localStorage.removeItem('userToken')
          route.push('/')
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.log('User not authenticated.')
          }
          if (error.response?.status === 403) {
            console.log('Invalid/Expired token.')
          }
          if (error.response?.status === 404) {
            console.log('User not found.')
          }
          if (error.response?.status === 500) {
            console.log('Server error.')
          }
        }
      }
    }
  }
  return (
    <>
    <div>
      {validToken && (<><LoggedHeader onClick={LogOut} />
        <div>
          <List
          weddingsArray={ownWeddingsArray}
          />
        </div>  
        </>
    )}
    </div>
    </>
  )
}
