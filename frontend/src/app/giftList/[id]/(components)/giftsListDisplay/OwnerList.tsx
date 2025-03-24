'use client'

import { useContextWrap } from '@/contextAPI/context'
import useDeleteGift from '@/app/giftList/[id]/(hooks)/useDeleteGift'
import useSubmitUpdate from '@/app/giftList/[id]/(hooks)/useSubmitUpdate'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import NewGiftForm from '../newGiftForm/newGift'
import GiftCard from '../giftCard/gift-card'

export type objValuesType = {
  productLink: string
  productName: string
  quantity: number
}

export default function OwnerList() {
  const { giftsArray, toUpdate, setToUpdate } = useContextWrap()
  const [selectedGiftID, setSelectedGiftID] = useState<number>(0)
  const [updateProps, setUpdateProps] = useState({
    productName: '',
    quantity: 0,
    productLink: '',
  })
  function handleUpdateInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateProps({
      ...updateProps,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <>
      <ul className="flex flex-col text-center items-center">
        {giftsArray.map((gift) => (
          <div
            id={gift.id.toString()}
            key={gift.id}
            className="p-3 sm:p-5 border-gray-400 w-full"
          >
           <GiftCard
           id={gift.id}
           productLink={gift.productLink}
           productName={gift.productName}
           quantity={gift.quantity}
           />
          </div>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center w-full m-auto">
        <NewGiftForm />
      </div>
    </>
  )
}
