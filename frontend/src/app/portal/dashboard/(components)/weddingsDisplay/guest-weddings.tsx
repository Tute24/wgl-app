'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetGuestWeddings from '../../(hooks)/useGetGuestWeddings'
import WeddingCard from '../weddingCard/wedding-card'
import { useEffect } from 'react'

export default function WeddingsGuest() {
  const { guestWeddingsArray } = useContextWrap()

  const getGuestWeddings = useGetGuestWeddings()

  useEffect(() => {
    getGuestWeddings()
  }, [])

  if (guestWeddingsArray.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center gap-10 w-full">
          {guestWeddingsArray.map((wedding) => (
            <li key={wedding.id}>
              <WeddingCard
                id={wedding.id}
                title={wedding.weddingTitle}
                date={wedding.weddingDate.replace(/-/g, '/')}
                isOwn={false}
              />
            </li>
          ))}
        </ul>
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
