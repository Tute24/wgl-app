'use client'

import giftsProps from '@/types/giftsProps'
import weddingDataProps from '@/types/weddingDataProps'
import { createContext, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: React.Dispatch<SetStateAction<string>>
  userToken: string | null
  setUserToken: (value: string) => void
  giftsArray: giftsProps[]
  setGiftsArray: React.Dispatch<SetStateAction<giftsProps[]>>
  weddingData: weddingDataProps
  setWeddingData: React.Dispatch<SetStateAction<weddingDataProps>>
  isCreator: boolean
  setIsCreator: React.Dispatch<SetStateAction<boolean>>
  notGuest: boolean
  setNotGuest: React.Dispatch<SetStateAction<boolean>>
  weddingID: number
  setWeddingID: React.Dispatch<SetStateAction<number>>
  toUpdate: boolean
  setToUpdate: React.Dispatch<SetStateAction<boolean>>
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [userToken, setUserToken] = useState<string | null>(null)
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [notGuest, setNotGuest] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState<boolean>(false)
  const [weddingID, setWeddingID] = useState<number>(0)
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
  const [weddingData, setWeddingData] = useState<weddingDataProps>({
    id: 0,
    weddingTitle: '',
    weddingDate: '',
    shippingAddress: '',
    createdBy: '',
    gifts: [
      {
        id: 0,
        quantity: 0,
        productName: '',
        productLink: '',
        fromWedding: 0,
        giftedBy: '',
      },
    ],
  })

  return (
    <contextWrap.Provider
      value={{
        statusMessage,
        setStatusMessage,
        userToken,
        setUserToken,
        giftsArray,
        setGiftsArray,
        weddingData,
        setWeddingData,
        isCreator,
        setIsCreator,
        notGuest,
        setNotGuest,
        weddingID,
        setWeddingID,
        toUpdate,
        setToUpdate,
      }}
    >
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
