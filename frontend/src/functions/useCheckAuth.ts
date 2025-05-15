'use client'

import { useContextWrap } from '@/contextAPI/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useCheckAuth() {
  const route = useRouter()
  const { setUserToken } = useContextWrap()

  useEffect(() => {
    function checkAuth() {
      const storedToken = localStorage.getItem('userToken')
      if (storedToken) {
        setUserToken(JSON.parse(storedToken))
      }

      if (!storedToken) {
        route.push('/')
      }
    }
    checkAuth()
  }, [setUserToken, route])
}
