'use client'

import { useContextWrap } from '@/contextAPI/context'
import GuestGiftCard from '../giftCard/guest-gift-card'

export default function GuestList() {
  const { giftsArray } = useContextWrap()

  return (
    <ul className="flex flex-col text-center items-center">
      {giftsArray.map((gift) => (
        <div
          id={gift.id.toString()}
          key={gift.id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <GuestGiftCard
            id={gift.id}
            productLink={gift.productLink}
            productName={gift.productName}
            quantity={gift.quantity}
          />
        </div>
      ))}
    </ul>
  )
}
