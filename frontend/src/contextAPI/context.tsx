'use client'

import giftsProps from '@/types/giftsProps'
import { createContext, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: (value: string) => void
  userToken: string|null
  setUserToken: (value:string) => void
  isGiftSent: boolean
  setIsGiftSent: React.Dispatch<SetStateAction<boolean>>
  sendGiftObj: {
    giftID: number
    quantity: number
  }
  setSendGiftObj: React.Dispatch<SetStateAction<{
    giftID: number
    quantity: number
  }>>
  giftsArray: giftsProps[]
  setGiftsArray: React.Dispatch<SetStateAction<giftsProps[]>>
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
