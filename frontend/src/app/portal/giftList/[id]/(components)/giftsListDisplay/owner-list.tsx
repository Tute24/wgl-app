'use client';

import NewGiftForm from '../new-gift-form/new-gift-form';
import GiftCard from '../giftCard/own-gift-card';
import WeddingHeader from '../wedding-header/wedding-header';
import useDeleteGift from '../../(hooks)/useDeleteGift';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { useShallow } from 'zustand/shallow';
import { ClipLoader } from 'react-spinners';
import DeleteModal from '@/app/(components)/modals/delete-modal';
import { useGeneralStore } from '@/stores/general/general.provider';

export type objValuesType = {
  productLink: string;
  productName: string;
  quantity: number;
};

export default function OwnerList() {
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    });
  }
  const deleteGift = useDeleteGift();
  const { weddingGifts, listHeader, hasHydrated } = useGiftsStore(
    useShallow((store) => ({
      listHeader: store.listHeader,
      weddingGifts: store.weddingGifts,
      hasHydrated: store.hasHydrated,
    })),
  );
  const { isLoading, modalObject, setModalObject } = useGeneralStore(
    useShallow((store) => ({
      isLoading: store.isLoading,
      modalObject: store.modalObject,
      setModalObject: store.setModalObject,
    })),
  );

  if (!hasHydrated || !listHeader) {
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    );
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
          You are the owner of this wedding
        </h2>
        <ul className="flex flex-col text-center items-center m-auto">
          {weddingGifts.map((gift) => (
            <div id={gift.Id.toString()} key={gift.Id} className="p-3 w-full">
              <GiftCard
                id={gift.Id}
                productLink={gift.productLink}
                productName={gift.productName}
                quantity={gift.quantity}
                setModalObject={setModalObject}
              />
            </div>
          ))}
          <div className="flex flex-col items-center justify-center w-full m-auto">
            <NewGiftForm />
          </div>
        </ul>
      </div>
      <div>
        {modalObject && (
          <DeleteModal
            itemName={modalObject.name}
            isOpen={modalObject.isOpen}
            id={modalObject.id}
            onCloseModal={closeModal}
            onDelete={deleteGift}
            ctaText="Delete Gift"
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
}
