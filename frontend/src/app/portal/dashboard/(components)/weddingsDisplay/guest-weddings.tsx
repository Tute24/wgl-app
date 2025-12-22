'use client';

import WeddingCard from '../weddingCard/wedding-card';
import { useWeddingsStore } from '@/stores/weddings/weddings.provider';
import { useShallow } from 'zustand/shallow';
import { ClipLoader } from 'react-spinners';
import { useGeneralStore } from '@/stores/general/general.provider';

export default function WeddingsGuest() {
  const { invitedWeddings, hasHydrated } = useWeddingsStore(
    useShallow((store) => ({
      invitedWeddings: store.invitedWeddings,
      hasHydrated: store.hasHydrated,
    })),
  );
  const { isRendering, setModalObject } = useGeneralStore(
    useShallow((store) => ({
      isRendering: store.isRendering,
      setModalObject: store.setModalObject,
    })),
  );

  if (!hasHydrated || isRendering)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    );

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
                setModalObject={setModalObject}
              />
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full h-full m-auto">
        <h2 className="font-inter font-bold text-center text-stone-700 text-lg">
          There are no weddings to exhibit at this section.
        </h2>
      </div>
    );
  }
}
