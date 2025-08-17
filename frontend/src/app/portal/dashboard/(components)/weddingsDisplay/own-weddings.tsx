'use client'

import WeddingCard from '../weddingCard/wedding-card'
import useDeleteWedding from '../../(hooks)/useDeleteWedding'
import DeleteModal from '@/app/(components)/modals/delete-modal'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useShallow } from 'zustand/shallow'
import { ClipLoader } from 'react-spinners'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function WeddingsOwn() {
  const deleteWedding = useDeleteWedding()
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    })
  }
  const { ownWeddings, hasHydrated } = useWeddingsStore(
    useShallow((store) => ({
      ownWeddings: store.ownWeddings,
      hasHydrated: store.hasHydrated,
    })),
  )
  const { isRendering, isLoading, modalObject, setModalObject } =
    useGeneralStore(
      useShallow((store) => ({
        isRendering: store.isRendering,
        isLoading: store.isLoading,
        modalObject: store.modalObject,
        setModalObject: store.setModalObject,
      })),
    )

  if (!hasHydrated || isRendering)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )

  if (ownWeddings.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center gap-10">
          {ownWeddings.map((wedding) => (
            <li key={wedding.id}>
              <WeddingCard
                id={wedding.id}
                title={wedding.weddingTitle}
                date={wedding.weddingDate.replace(/-/g, '/')}
                isOwn={true}
                setModalObject={setModalObject}
              />
            </li>
          ))}
        </ul>
        {modalObject && (
          <DeleteModal
            itemName={modalObject.name}
            onDelete={deleteWedding}
            onCloseModal={closeModal}
            isOpen={modalObject.isOpen}
            id={modalObject.id}
            ctaText="Delete Wedding"
            isLoading={isLoading}
          />
        )}
      </>
    )
  } else {
    return (
      <div className="flex justify-center items-center w-full h-full m-auto">
        <h2 className="font-inter font-bold text-center text-stone-700 text-lg">
          There are no weddings to exhibit at this section.
        </h2>
      </div>
    )
  }
}
