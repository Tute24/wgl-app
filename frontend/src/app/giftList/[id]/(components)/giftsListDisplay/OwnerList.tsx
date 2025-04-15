'use client'

import { useContextWrap } from '@/contextAPI/context'
import NewGiftForm from '../newGiftForm/newGift'
import GiftCard from '../giftCard/own-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'

export type objValuesType = {
  productLink: string
  productName: string
  quantity: number
}

export default function OwnerList() {
  const { giftsArray, weddingData } = useContextWrap()
  return (
    <>
      <WeddingHeader
        owner={true}
        weddingDate={weddingData.weddingDate}
        weddingTitle={weddingData.weddingTitle}
        id={weddingData.id}
      />
      <h2 className="font-bold text-amber-800">You're this wedding's owner</h2>
      <ul className="flex flex-col text-center items-center">
        {giftsArray.map((gift) => (
          <div id={gift.id.toString()} key={gift.id} className="p-3 w-full">
            <GiftCard
              id={gift.id}
              productLink={gift.productLink}
              productName={gift.productName}
              quantity={gift.quantity}
            />
          </div>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center w-full m-auto pb-3">
        <NewGiftForm />
      </div>
    </>
  )
}
