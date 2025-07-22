'use client'

import GuestGiftCard from '../giftCard/guest-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useShallow } from 'zustand/shallow'

export default function GuestList() {
  const { weddingGifts, listHeader, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      listHeader: store.listHeader,
      weddingGifts: store.weddingGifts,
      hasHydrated: store.hasHydrated,
    })),
  )

  if (!hasHydrated || !listHeader) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }
  return (
    <div className=" flex flex-col items-center gap-5">
      <WeddingHeader
        owner={false}
        weddingDate={listHeader!.listHeaderDate}
        weddingTitle={listHeader!.listHeaderTitle}
        id={listHeader!.weddingId}
      />
      <h2 className="font-bold text-2xl text-amber-800 font-inter">
        You're this wedding's guest
      </h2>
      <ul className="flex flex-col text-center items-center gap-8 mb-5">
        {weddingGifts.map((gift) => (
          <div id={gift.Id.toString()} key={gift.Id} className="w-full">
            <GuestGiftCard
              id={gift.Id}
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
