'use client'

import { useRequestsStore } from '@/stores/requests/requests.provider'
import RequestCard from './(components)/request-card'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'
import useGetRequests from './(hooks)/useGetRequests'
import { ClipLoader } from 'react-spinners'

export default function RequestsHistoryPage() {
  const { requests, hasHydrated } = useRequestsStore(
    useShallow((store) => ({
      requests: store.requests,
      hasHydrated: store.hasHydrated,
    })),
  )

  const getRequests = useGetRequests()

  useEffect(() => {
    getRequests()
  }, [getRequests])

  if (!hasHydrated) {
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )
  }
  return (
    <div className="px-3">
      <div className="py-5 text-2xl font-poppins text-amber-800 font-semibold flex flex-col gap-2 px-4 items-center text-center">
        <h1>See all of the requests to your weddings' lists below:</h1>
        <h2 className="text-[14px] sm:text-[18px] text-stone-500 font-normal max-w-[500px] leading-[1.3]">
          You can accept or deny a request, and see the ones who were already
          accepted or denied as well.
        </h2>
      </div>
      <div className="flex flex-col items-center mx-auto px-4 py-5 gap-5">
        {requests.length > 0 ? (
          requests
            .sort((a, b) => Number(b.pending) - Number(a.pending))
            .map((request) => (
              <RequestCard
                key={request.id}
                requestId={request.id}
                madeOn={request.madeOn}
                weddingTitle={request.weddingTitle}
                requestByName={request.requestByName}
                pending={request.pending}
                accepted={request.accepted}
              />
            ))
        ) : (
          <div className="font-inter text-stone-700 font-semibold text-xl text-center">
            No requests to show at the moment.
          </div>
        )}
      </div>
    </div>
  )
}
