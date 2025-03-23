'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'
import WeddingCard from '../weddingCard/wedding-card'

export default function WeddingsOwn() {
  const { ownWeddingsArray } = useContextWrap()
  useGetOwnWeddings()
  if (ownWeddingsArray.length > 0) {
    return (
      <ul className="flex flex-col text-center items-center">
        {ownWeddingsArray.map((wedding) => (
          <div
            id={`${wedding.id}`}
            key={wedding.id}
            className="p-3 sm:p-5 border-gray-400 w-full flex flex-row"
          >
            <WeddingCard
              id={wedding.id}
              title={wedding.weddingTitle}
              date={wedding.weddingDate.replace(/-/g, '/')}
              isOwn={true}
            />
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
