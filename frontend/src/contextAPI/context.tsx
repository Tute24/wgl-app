'use client'

import giftCreateProps from '@/types/giftCreateProps'
import giftsProps from '@/types/giftsProps'
import newWeddingProps from '@/types/newWeddingProps'
import weddingDataProps from '@/types/weddingDataProps'
import weddingProps from '@/types/weddingProps'
import { createContext, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  statusMessage: string
  setStatusMessage: (value: string) => void
  userToken: string | null
  setUserToken: (value: string) => void
  isGiftSent: boolean
  setIsGiftSent: React.Dispatch<SetStateAction<boolean>>
  sendGiftObj: {
    giftID: number
    quantity: number
  }
  setSendGiftObj: React.Dispatch<
    SetStateAction<{
      giftID: number
      quantity: number
    }>
  >
  updateProps: {
    giftID: number
    productName: string
    quantity: number
    productLink: string
  }
  setUpdateProps: React.Dispatch<
    SetStateAction<{
      giftID: number
      productName: string
      quantity: number
      productLink: string
    }>
  >
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
  createNewGift: giftCreateProps[]
  setCreateNewGift: React.Dispatch<SetStateAction<giftCreateProps[]>>
  ownWeddingsArray: weddingProps[]
  setOwnWeddingsArray: React.Dispatch<SetStateAction<weddingProps[]>>
  listData: newWeddingProps
  setListData: React.Dispatch<SetStateAction<newWeddingProps>>
}

const contextWrap = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [userToken, setUserToken] = useState<string | null>(null)
  const [isGiftSent, setIsGiftSent] = useState<boolean>(false)
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [notGuest, setNotGuest] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState<boolean>(false)
  const [weddingID, setWeddingID] = useState<number>(0)
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
  const [updateProps, setUpdateProps] = useState({
    giftID: 0,
    productName: '',
    quantity: 0,
    productLink: '',
  })
  const [createNewGift, setCreateNewGift] = useState<giftCreateProps[]>([])
  const [ownWeddingsArray, setOwnWeddingsArray] = useState<weddingProps[]>([
    {
      id: 0,
      weddingTitle: '',
      weddingDate: '',
      shippingAddress: '',
      createdBy: '',
    },
  ])
  const [listData, setListData] = useState<newWeddingProps>({
    listTitle: '',
    weddingDate: '',
    shippingAddress: '',
    gifts: [
      {
        productName: '',
        productLink: '',
        quantity: 0,
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
        isGiftSent,
        setIsGiftSent,
        sendGiftObj,
        setSendGiftObj,
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
        updateProps,
        setUpdateProps,
        createNewGift,
        setCreateNewGift,
        ownWeddingsArray,
        setOwnWeddingsArray,
        listData,
        setListData,
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
