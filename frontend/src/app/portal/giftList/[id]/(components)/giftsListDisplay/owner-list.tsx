'use client'

import { useContextWrap } from '@/contextAPI/context'
import NewGiftForm from '../new-gift-form/new-gift-form'
import GiftCard from '../giftCard/own-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'
import useDeleteGift from '../../(hooks)/useDeleteGift'
import DeleteModal from '@/components/modals/delete-modal'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useShallow } from 'zustand/shallow'

export type objValuesType = {
  productLink: string
  productName: string
  quantity: number
}

export default function OwnerList() {
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    })
  }
  const deleteGift = useDeleteGift()
  const { modalObject, setModalObject } = useContextWrap()
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
    <>
      <div className="flex flex-col items-center gap-3 sm:gap-5">
        <WeddingHeader
          owner={true}
          weddingDate={listHeader!.listHeaderDate}
          weddingTitle={listHeader!.listHeaderTitle}
          id={listHeader!.weddingId}
        />
        <h2 className="font-bold text-amber-800 text-2xl font-inter">
          You're this wedding's owner
        </h2>
        <ul className="flex flex-col text-center items-center m-auto">
          {weddingGifts.map((gift) => (
            <div id={gift.Id.toString()} key={gift.Id} className="p-3 w-full">
              <GiftCard
                id={gift.Id}
                productLink={gift.productLink}
                productName={gift.productName}
                quantity={gift.quantity}
              />
            </div>
          ))}
          <div className="flex flex-col items-center justify-center w-full m-auto">
            <NewGiftForm />
          </div>
        </ul>
      </div>
      <div>
        <DeleteModal
          itemName={modalObject.name}
          isOpen={modalObject.isOpen}
          id={modalObject.id}
          onCloseModal={closeModal}
          onDelete={deleteGift}
          ctaText="Delete Gift"
        />
      </div>
    </>
  )
}
