'use client'

import { useContextWrap } from '@/contextAPI/context'
import NewGiftForm from '../newGiftForm/newGift'
import GiftCard from '../giftCard/gift-card'

export type objValuesType = {
  productLink: string
  productName: string
  quantity: number
}

export default function OwnerList() {
  const { giftsArray } = useContextWrap()
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
