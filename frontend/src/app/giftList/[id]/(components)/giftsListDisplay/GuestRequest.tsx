'use client'

import { useContextWrap } from '@/contextAPI/context'
import useMakeRequest from '@/app/giftList/[id]/(hooks)/useMakeRequest'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function GuestRequest() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { statusMessage, setNotGuest, isCreator, notGuest } = useContextWrap()
  const makeRequest = useMakeRequest(weddingID)
  if (notGuest && !isCreator) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <h2>
            Not a guest of this wedding, make a request or go back to the
            initial page
          </h2>
          <div className="flex flex-col">
            <div className="py-3 flex flex-row justify-center gap-2">
              <Link href="/dashboard">
                <button
                  onClick={() => {
                    setNotGuest(false)
                  }}
                  className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
                >
                  <span className="text-xs">Go back to the dashboard</span>
                </button>
              </Link>
              <button
                onClick={makeRequest}
                className="px-5 py-2 bg-black text-white font-bold rounded-3xl hover:bg-black"
              >
                <span className="text-xs">Request Access to the list</span>
              </button>
            </div>
            <div>
              <span className="font-bold text-xs py-3">{statusMessage}</span>
            </div>
          </div>
        </div>
      </>
    )
  }
}
