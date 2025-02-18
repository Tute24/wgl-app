'use client'

import giftsProps from '@/types/giftsProps'
import { createContext, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: (value: string) => void
  userToken: string|null
  setUserToken: (value:string) => void
  isGiftSent: boolean
  setIsGiftSent: (value:boolean)=> void
  sendGiftObj: {
    giftID: number
    quantity: number
  }
  setSendGiftObj: (value: {
    giftID: number
    quantity: number
  }) => void
  giftsArray: giftsProps[]
  setGiftsArray: (value: giftsProps[]) => void
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [userToken,setUserToken] = useState<string|null>(null)
  const [isGiftSent, setIsGiftSent] = useState<boolean>(false)
  const [sendGiftObj, setSendGiftObj] = useState({
    giftID: 0,
    quantity: 0,
  })
  const [giftsArray, setGiftsArray] = useState<giftsProps[]>([
      {
        id: 0,
        quantity: 0,
        productName: '',
        productLink: '',
        fromWedding: 0,
        giftedBy: '',
      },
    ])

  return (
    <contextWrap.Provider value={{ statusMessage, setStatusMessage, userToken, setUserToken, isGiftSent, setIsGiftSent, sendGiftObj, setSendGiftObj, giftsArray, setGiftsArray }}>
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
