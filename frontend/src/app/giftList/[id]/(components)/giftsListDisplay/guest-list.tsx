'use client'

import { useContextWrap } from '@/contextAPI/context'
import GuestGiftCard from '../giftCard/guest-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'

export default function GuestList() {
  const { giftsArray, weddingData } = useContextWrap()

  return (
    <div className=" flex flex-col items-center gap-5">
      <WeddingHeader
        owner={false}
        weddingDate={weddingData.weddingDate}
        weddingTitle={weddingData.weddingTitle}
        id={weddingData.id}
      />
      <h2 className="font-bold text-2xl text-amber-800 font-inter">
        You're this wedding's guest
      </h2>
      <ul className="flex flex-col text-center items-center gap-8 mb-5">
        {giftsArray.map((gift) => (
          <div id={gift.id.toString()} key={gift.id} className="w-full">
            <GuestGiftCard
              id={gift.id}
              productLink={gift.productLink}
              productName={gift.productName}
              quantity={gift.quantity}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
