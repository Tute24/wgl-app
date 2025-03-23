'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import useGetGuestWeddings from '../../(hooks)/useGetGuestWeddings'
import WeddingCard from '../weddingCard/wedding-card'

export default function WeddingsGuest() {
  const { guestWeddingsArray } = useContextWrap()

  useGetGuestWeddings()

  if (guestWeddingsArray.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center">
          {guestWeddingsArray.map((wedding) => (
            <div
              id={`${wedding.id}`}
              key={wedding.id}
              className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
            >
              <WeddingCard
                id={wedding.id}
                title={wedding.weddingTitle}
                date={wedding.weddingDate}
              />
            </div>
          ))}
        </ul>
      </>
    )
  } else {
    return (
      <h2 className="flex flex-col justify-center items-center font-semibold">
        There are no weddings to exhibit at this section.
      </h2>
    )
  }
}
