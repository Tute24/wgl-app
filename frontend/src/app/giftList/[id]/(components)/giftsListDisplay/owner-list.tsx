'use client'

import { useContextWrap } from '@/contextAPI/context'
import NewGiftForm from '../new-gift-form/new-gift-form'
import GiftCard from '../giftCard/own-gift-card'
import WeddingHeader from '../wedding-header/wedding-header'
import useDeleteGift from '../../(hooks)/useDeleteGift'
import DeleteModal from '@/components/modals/delete-modal'

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
  const { giftsArray, weddingData, modalObject, setModalObject } =
    useContextWrap()
  return (
    <>
      <div className="flex flex-col items-center gap-3 sm:gap-5">
        <WeddingHeader
          owner={true}
          weddingDate={weddingData.weddingDate}
          weddingTitle={weddingData.weddingTitle}
          id={weddingData.id}
        />
        <h2 className="font-bold text-amber-800 text-2xl font-inter">
          You're this wedding's owner
        </h2>
        <ul className="flex flex-col text-center items-center m-auto">
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
