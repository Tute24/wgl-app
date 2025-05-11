'use client'

import { useContextWrap } from '@/contextAPI/context'
import GuestGiftCard from '../giftCard/guest-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'

export default function GuestList() {
  const { giftsArray, weddingData } = useContextWrap()

  return (
    <>
      <WeddingHeader
        owner={false}
        weddingDate={weddingData.weddingDate}
        weddingTitle={weddingData.weddingTitle}
        id={weddingData.id}
      />
      <h2 className="font-bold text-amber-800">You're this wedding's owner</h2>
      <ul className="flex flex-col text-center items-center">
        {giftsArray.map((gift) => (
          <div id={gift.id.toString()} key={gift.id} className="p-5 w-full">
            <GuestGiftCard
              id={gift.id}
              productLink={gift.productLink}
              productName={gift.productName}
              quantity={gift.quantity}
            />
          </div>
        ))}
      </ul>
    </>
  )
}
