'use client'

import useGetGuestWeddings from '../../(hooks)/useGetGuestWeddings'
import WeddingCard from '../weddingCard/wedding-card'
import { useEffect } from 'react'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useShallow } from 'zustand/shallow'
import { ClipLoader } from 'react-spinners'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function WeddingsGuest() {
  const getGuestWeddings = useGetGuestWeddings()

  useEffect(() => {
    getGuestWeddings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { invitedWeddings, hasHydrated } = useWeddingsStore(
    useShallow((store) => ({
      invitedWeddings: store.invitedWeddings,
      hasHydrated: store.hasHydrated,
    })),
  )
  const { isRendering } = useGeneralStore(
    useShallow((store) => ({
      isRendering: store.isRendering,
    })),
  )

  if (!hasHydrated || isRendering)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )

  if (invitedWeddings.length > 0) {
    return (
      <>
        <ul className="flex flex-col text-center items-center gap-10 w-full">
          {invitedWeddings.map((wedding) => (
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
