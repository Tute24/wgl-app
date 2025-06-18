'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGetGuestWeddings from '../../(hooks)/useGetGuestWeddings'
import WeddingCard from '../weddingCard/wedding-card'

export default function WeddingsGuest() {
  const { guestWeddingsArray } = useContextWrap()

  useGetGuestWeddings()

  if (guestWeddingsArray.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center gap-10">
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
      <h2 className="flex flex-col justify-center items-center font-bold">
        There are no weddings to exhibit at this section.
      </h2>
    )
  }
}
