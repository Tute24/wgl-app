'use client'

import { generalModalProps } from '@/types-props/general-modal-props'
import giftsProps from '@/types-props/giftsProps'
import weddingDataProps from '@/types-props/weddingDataProps'
import weddingHeaderInfoProps from '@/types-props/weddingHeaderInfo'
import weddingProps from '@/types-props/weddingProps'
import { createContext, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: React.Dispatch<SetStateAction<string>>
  userToken: string | null
  setUserToken: (value: string) => void
  giftsArray: giftsProps[]
  setGiftsArray: React.Dispatch<SetStateAction<giftsProps[]>>
  weddingData: weddingDataProps
  ownWeddingsArray: weddingProps[]
  setOwnWeddingsArray: React.Dispatch<SetStateAction<weddingProps[]>>
  guestWeddingsArray: weddingProps[]
  setGuestWeddingsArray: React.Dispatch<SetStateAction<weddingProps[]>>
  setWeddingData: React.Dispatch<SetStateAction<weddingDataProps>>
  isCreator: boolean
  setIsCreator: React.Dispatch<SetStateAction<boolean>>
  notGuest: boolean
  setNotGuest: React.Dispatch<SetStateAction<boolean>>
  weddingID: number
  setWeddingID: React.Dispatch<SetStateAction<number>>
  toUpdate: boolean
  setToUpdate: React.Dispatch<SetStateAction<boolean>>
  weddingHeaderInfo: weddingHeaderInfoProps
  setWeddingHeaderInfo: React.Dispatch<SetStateAction<weddingHeaderInfoProps>>
  modalObject: generalModalProps
  setModalObject: React.Dispatch<SetStateAction<generalModalProps>>
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [userToken, setUserToken] = useState<string | null>(null)
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [notGuest, setNotGuest] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState<boolean>(false)
  const [weddingID, setWeddingID] = useState<number>(0)
  const [giftsArray, setGiftsArray] = useState<giftsProps[]>([])
  const [weddingHeaderInfo, setWeddingHeaderInfo] =
    useState<weddingHeaderInfoProps>({
      id: 0,
      weddingTitle: '',
      weddingDate: '',
    })
  const [ownWeddingsArray, setOwnWeddingsArray] = useState<weddingProps[]>([])
  const [guestWeddingsArray, setGuestWeddingsArray] = useState<weddingProps[]>(
    [],
  )
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
  const [modalObject, setModalObject] = useState<generalModalProps>({
    id: 0,
    name: '',
    isOpen: false,
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
        ownWeddingsArray,
        setOwnWeddingsArray,
        guestWeddingsArray,
        setGuestWeddingsArray,
        weddingHeaderInfo,
        setWeddingHeaderInfo,
        modalObject,
        setModalObject,
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
