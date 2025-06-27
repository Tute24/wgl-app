'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'
import WeddingCard from '../weddingCard/wedding-card'
import DeleteWeddingModal from '@/components/modals/delete-weddings-modal'
import useDeleteWedding from '../../(hooks)/useDeleteWedding'

export default function WeddingsOwn() {
  function closeModal() {
    setModalObject({
      id: 0,
      name: '',
      isOpen: false,
    })
  }
  const { ownWeddingsArray, modalObject, setModalObject } = useContextWrap()
  const { id, name, isOpen } = modalObject
  useGetOwnWeddings()
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
        <div>
          {modalObject && (
            <DeleteWeddingModal
              wedding={name}
              onDelete={deleteWedding}
              onCloseModal={closeModal}
              isOpen={isOpen}
              id={id}
            />
          )}
        </div>
      </>
    )
  } else {
    return (
      <h2 className="flex flex-col font-inter justify-center items-center font-bold">
        You haven't registered any weddings
      </h2>
    )
  }
}
