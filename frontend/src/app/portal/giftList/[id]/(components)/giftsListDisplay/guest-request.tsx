'use client'

import { useContextWrap } from '@/contextAPI/context'
import useMakeRequest from '@/app/portal/giftList/[id]/(hooks)/useMakeRequest'
import { useParams, useRouter } from 'next/navigation'
import WeddingHeader from '../wedding-header/wedding-header'
import { Button } from '@/components/ui/button'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useShallow } from 'zustand/shallow'

export default function GuestRequest() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { statusMessage } = useContextWrap()
  const makeRequest = useMakeRequest(weddingID)
  const route = useRouter()
  const listHeader = useGiftsStore(useShallow((store) => store.listHeader))
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center gap-5">
        <WeddingHeader
          owner={false}
          weddingDate={listHeader!.listHeaderDate}
          weddingTitle={listHeader!.listHeaderTitle}
          id={listHeader!.weddingId}
        />
        <h2 className="font-bold text-md sm:text-xl text-amber-800 font-inter">
          Not currently a guest of this wedding. <br /> You can make a request
          or go back to the initial page.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 justify-center text-center w-full font-inter">
          <Button
            onClick={() => {
              route.push('/dashboard')
            }}
            variant="default"
            className="min-w-[225px] text-md font-bold"
          >
            Go back to the dashboard
          </Button>
          <Button
            onClick={makeRequest}
            className="min-w-[225px] text-md bg-paleGold text-amber-800 font-bold hover:bg-mutedTaupe hover:text-champagneGold"
          >
            Request access to the list
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center text-center font-inter">
          <span className="font-bold text-sm pt-5 text-green-800">
            {statusMessage}
          </span>
        </div>
      </div>
    </>
  )
}
