'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'
import WeddingCard from '../weddingCard/wedding-card'
import useDeleteWedding from '../../(hooks)/useDeleteWedding'
import DeleteModal from '@/components/modals/delete-modal'
import { useEffect } from 'react'

export default function WeddingsOwn() {
  const getOwnWeddings = useGetOwnWeddings()
  useEffect(() => {
    getOwnWeddings()
  }, [])
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    })
  }
  const { ownWeddingsArray, modalObject, setModalObject } = useContextWrap()
  const { id, name, isOpen } = modalObject

  const deleteWedding = useDeleteWedding()
  if (ownWeddingsArray.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center gap-10">
          {ownWeddingsArray.map((wedding) => (
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
          You haven't created any weddings.
        </h2>
      </div>
    )
  }
}
