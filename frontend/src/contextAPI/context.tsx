'use client'

import { createContext, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: (value: string) => void
  validToken: boolean
  setValidToken:(value:boolean) => void
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [validToken, setValidToken] = useState<boolean>(false)

  return (
    <contextWrap.Provider value={{ statusMessage, setStatusMessage, validToken, setValidToken }}>
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
