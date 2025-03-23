'use client'

import Link from 'next/link'
import useDeleteWedding from '@/app/dashboard/(hooks)/useDeleteWedding'
import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'
import WeddingCard from '../weddingCard/wedding-card'

export default function WeddingsOwn() {
  const deleteWedding = useDeleteWedding()
  const { ownWeddingsArray } = useContextWrap()
  useGetOwnWeddings()
  if (ownWeddingsArray.length > 0) {
    return (
      <ul className="flex flex-col text-center items-center">
        {ownWeddingsArray.map((wedding) => (
          <div
            id={`${wedding.id}`}
            key={wedding.id}
            className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5 flex flex-row"
          >
            <WeddingCard
              id={wedding.id}
              title={wedding.weddingTitle}
              date={wedding.weddingDate}
            />
            <button
              onClick={() => deleteWedding(wedding.id)}
              className="font-semibold text-xs border-solid border-red-200 border-2 rounded-3xl px-2 py-1 mr-2 hover:bg-red-300"
            >
              Delete this wedding
            </button>
          </div>
        ))}
      </ul>
    )
  } else {
    return (
      <h2 className="flex flex-col justify-center items-center font-bold">
        You haven't registered any weddings
      </h2>
    )
  }
}
