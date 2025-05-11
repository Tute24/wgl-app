'use client'

import { useContextWrap } from '@/contextAPI/context'
import useMakeRequest from '@/app/giftList/[id]/(hooks)/useMakeRequest'
import { useParams, useRouter } from 'next/navigation'
import UserButton from '@/components/Common/buttons/user-button/user-button'
import WeddingHeader from '../wedding-header/wedding-header'

export default function GuestRequest() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { statusMessage, setNotGuest, weddingHeaderInfo } = useContextWrap()
  const makeRequest = useMakeRequest(weddingID)
  const route = useRouter()

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <WeddingHeader
          owner={false}
          weddingDate={weddingHeaderInfo.weddingDate}
          weddingTitle={weddingHeaderInfo.weddingTitle}
          id={weddingHeaderInfo.id}
        />
        <h2 className="font-bold text-amber-800">
          Not a guest of this wedding currently. You can make a request or go
          back to the initial page.
        </h2>
        <div className="flex flex-col">
          <div className="pt-5 flex flex-row justify-center gap-8">
            <UserButton
              className="!bg-warmBeige !w-[225px]"
              content="Go back to the dashboard"
              onClick={() => {
                setNotGuest(false)
                route.push('/dashboard')
              }}
            />
            <UserButton
              className="!w-[225px]"
              content="Request access to the list"
              onClick={makeRequest}
            />
          </div>
          <div>
            <span className="font-bold text-xs py-3">{statusMessage}</span>
          </div>
        </div>
      </div>
    </>
  )
}
