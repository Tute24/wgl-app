'use client'

import { createContext, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: (value: string) => void
  userToken: string|null
  setUserToken: (value:string) => void
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [userToken,setUserToken] = useState<string|null>(null)

  return (
    <contextWrap.Provider value={{ statusMessage, setStatusMessage, userToken, setUserToken }}>
      {children}
    </contextWrap.Provider>
  )
}

export function useContextWrap() {
  const context = useContext(contextWrap)

  if (!context) {
    throw new Error('Context Error')
  }
  return context
}
