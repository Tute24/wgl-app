'use client'

import { useContextWrap } from '@/contextAPI/context'
import useMakeRequest from '@/app/giftList/[id]/(hooks)/useMakeRequest'
import { useParams, useRouter } from 'next/navigation'
import WeddingHeader from '../wedding-header/wedding-header'
import { Button } from '@/components/ui/button'

export default function GuestRequest() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { statusMessage, setNotGuest, weddingHeaderInfo } = useContextWrap()
  const makeRequest = useMakeRequest(weddingID)
  const route = useRouter()

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center gap-5">
        <WeddingHeader
          owner={false}
          weddingDate={weddingHeaderInfo.weddingDate}
          weddingTitle={weddingHeaderInfo.weddingTitle}
          id={weddingHeaderInfo.id}
        />
        <h2 className="font-bold text-md sm:text-xl text-amber-800 font-inter">
          Not currently a guest of this wedding. <br /> You can make a request
          or go back to the initial page.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 justify-center text-center w-full font-inter">
          <Button
            onClick={() => {
              setNotGuest(false)
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
