'use client'

import { useContextWrap } from '@/contextAPI/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function checkAuth() {
  const route = useRouter()
  const { setValidToken, userToken, setUserToken } = useContextWrap()

  useEffect(() => {
    function checkAuth() {
      const storedToken = localStorage.getItem('userToken')
      if (storedToken) {
        setUserToken(JSON.parse(storedToken))
      }

      if (!storedToken) {
        route.push('/')
        return
      }
      setValidToken(true)
    }
    checkAuth()
  }, [])
}
