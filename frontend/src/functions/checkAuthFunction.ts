'use client'

import { useContextWrap } from "@/contextAPI/context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function checkAuth(){

    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')
    const route = useRouter()
    const {setValidToken} = useContextWrap()

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

}