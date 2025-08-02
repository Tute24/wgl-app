'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'
import WeddingCard from '../weddingCard/wedding-card'
import useDeleteWedding from '../../(hooks)/useDeleteWedding'
import DeleteModal from '@/components/modals/delete-modal'
import { useEffect } from 'react'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useShallow } from 'zustand/shallow'
import { ClipLoader } from 'react-spinners'

export default function WeddingsOwn() {
  const getOwnWeddings = useGetOwnWeddings()
  useEffect(() => {
    getOwnWeddings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const deleteWedding = useDeleteWedding()
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    })
  }
  const { modalObject, setModalObject } = useContextWrap()
  const { id, name, isOpen } = modalObject
  const { ownWeddings, hasHydrated } = useWeddingsStore(
    useShallow((store) => ({
      ownWeddings: store.ownWeddings,
      hasHydrated: store.hasHydrated,
    })),
  )

  if (!hasHydrated)
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
              />
            </li>
          ))}
        </ul>
        {modalObject && (
          <DeleteModal
            itemName={name}
            onDelete={deleteWedding}
            onCloseModal={closeModal}
            isOpen={isOpen}
            id={id}
            ctaText="Delete Wedding"
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
